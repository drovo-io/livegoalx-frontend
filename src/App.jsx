// src/App.jsx
import { useState } from 'react';
import './App.css';
import { leagues } from './mockData';

function App() {
  const [view, setView] = useState('LEAGUES');
  const [context, setContext] = useState(null);
  const [selection, setSelection] = useState(null);

  const navigateTo = (newView, newContext) => {
    setContext(newContext);
    setView(newView);
    setSelection(null);
  };

  switch (view) {
    case 'LEAGUE_HUB':
      return <LeagueHubView league={context} onMatchSelect={(match) => navigateTo('MARKETS', match)} onBack={() => navigateTo('LEAGUES')} />;
    case 'MARKETS':
      const currentLeague = leagues.find(l => l.name === context.leagueName);
      return <MarketView match={context} selection={selection} setSelection={setSelection} onBack={() => navigateTo('LEAGUE_HUB', currentLeague)} />;
    default:
      return <LeagueListView onLeagueSelect={(league) => navigateTo('LEAGUE_HUB', league)} />;
  }
}

// --- View Components ---

const LeagueListView = ({ onLeagueSelect }) => (
  <div className="list-view">
    <header className="view-header"><h1>Leagues</h1></header>
    {leagues.map(league => (
      <div key={league.name} className={`list-item ${league.matches.length === 0 ? 'disabled' : ''}`} onClick={() => league.matches.length > 0 && onLeagueSelect(league)}>
        <span>{league.name}</span>
        {league.matches.length > 0 ? <span className="arrow">&rsaquo;</span> : <span className="empty-tag">Empty</span>}
      </div>
    ))}
  </div>
);

const LeagueHubView = ({ league, onMatchSelect, onBack }) => {
  const [activeTab, setActiveTab] = useState('MATCHES');

  return (
    <div className="list-view">
      <header className="view-header">
        <button onClick={onBack} className="back-button">&lsaquo;</button>
        {league.logoUrl && <img src={league.logoUrl} alt={`${league.name} logo`} className="league-logo" />}
        <h1>{league.name}</h1>
      </header>
      <div className="tab-switcher">
        <button onClick={() => setActiveTab('MATCHES')} className={activeTab === 'MATCHES' ? 'active' : ''}>Matches</button>
        <button onClick={() => setActiveTab('TABLE')} className={activeTab === 'TABLE' ? 'active' : ''}>Table</button>
      </div>
      <div className="tab-content">
        {activeTab === 'MATCHES' && <MatchListContent league={league} onMatchSelect={onMatchSelect} />}
        {activeTab === 'TABLE' && <TableView table={league.table} />}
      </div>
    </div>
  );
};

const MarketView = ({ match, selection, setSelection, onBack }) => {
  const handleOddSelect = (selectedOdd) => {
    setSelection(prev => (prev?.label === selectedOdd.label ? null : selectedOdd));
  };

  return (
    <div className="market-view-container">
      <header className="view-header fixed-header">
        <button onClick={onBack} className="back-button">&lsaquo;</button>
        <h1>{match.teamA} vs {match.teamB}</h1>
      </header>
      <main className="market-scroll-area">
        {match.markets.map((market) => (
          <MarketGroup
            key={market.name}
            name={market.name}
            odds={market.odds}
            selection={selection}
            onOddSelect={(odd) => handleOddSelect({ marketName: market.name, ...odd })}
          />
        ))}
      </main>
      {selection && (
        <footer className="bet-slip-preview">
          <p><span>Your Pick: <strong>{selection.label}</strong></span><span>@{selection.value}</span></p>
          <button className="place-bet-button">Place Bet</button>
        </footer>
      )}
    </div>
  );
};

// --- Content Components for Tabs ---

const MatchListContent = ({ league, onMatchSelect }) => (
  <>
    {league.matches.length > 0 ? league.matches.map(match => (
      <div key={match.id} className="list-item" onClick={() => onMatchSelect({ ...match, leagueName: league.name })}>
        <span>{match.teamA} vs {match.teamB}</span>
        <span className="arrow">&rsaquo;</span>
      </div>
    )) : <p className="empty-message">No matches available right now.</p>}
  </>
);

const TableView = ({ table }) => (
    <div className="table-container">
        {table.length > 0 ? (
            <table className="league-table">
                <thead>
                    <tr><th>#</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>Pts</th></tr>
                </thead>
                <tbody>
                    {table.map(row => (
                        <tr key={row.pos}>
                            <td>{row.pos}</td><td>{row.team}</td><td>{row.p}</td>
                            <td>{row.w}</td><td>{row.d}</td><td>{row.l}</td><td><strong>{row.pts}</strong></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : <p className="empty-message">Table data is not available.</p>}
    </div>
);

// --- Reusable UI Components ---

const MarketGroup = ({ name, odds, selection, onOddSelect }) => (
  <div className="market-group">
    <h2 className="market-title">{name}</h2>
    <div className="odds-container">
      {odds.map((odd) => (
        <OddButton
          key={odd.label}
          label={odd.label}
          value={odd.value}
          isSelected={selection?.label === odd.label}
          onSelect={() => onOddSelect(odd)}
        />
      ))}
    </div>
  </div>
);

const OddButton = ({ label, value, isSelected, onSelect }) => (
  <div className={`odd-button ${isSelected ? 'selected' : ''}`} onClick={onSelect}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default App;