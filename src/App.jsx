// src/App.jsx
import { useState } from 'react';
import './App.css';
import { leagues } from './mockData';

// --- State Management ---
// Three possible views: 'LEAGUES', 'MATCHES', 'MARKETS'
// `context` stores the selected league or match
function App() {
  const [view, setView] = useState('LEAGUES');
  const [context, setContext] = useState(null);
  const [selection, setSelection] = useState(null); // For the chosen odd

  const navigateTo = (newView, newContext) => {
    setContext(newContext);
    setView(newView);
    setSelection(null); // Clear selection on navigation
  };

  // --- Conditional Rendering based on View ---
  switch (view) {
    case 'MATCHES':
      return <MatchListView league={context} onMatchSelect={(match) => navigateTo('MARKETS', match)} onBack={() => navigateTo('LEAGUES')} />;
    case 'MARKETS':
      return <MarketView match={context} selection={selection} setSelection={setSelection} onBack={() => navigateTo('MATCHES', leagues.find(l => l.name === context.leagueName))} />;
    default:
      return <LeagueListView onLeagueSelect={(league) => navigateTo('MATCHES', league)} />;
  }
}

// --- View Components ---

const LeagueListView = ({ onLeagueSelect }) => (
  <div className="list-view">
    <header className="view-header"><h1>Leagues</h1></header>
    {leagues.map(league => (
      <div key={league.name} className="list-item" onClick={() => league.matches.length > 0 && onLeagueSelect(league)}>
        <span>{league.name}</span>
        {league.matches.length > 0 ? <span className="arrow">&rsaquo;</span> : <span className="empty-tag">Empty</span>}
      </div>
    ))}
  </div>
);

const MatchListView = ({ league, onMatchSelect, onBack }) => (
    <div className="list-view">
        <header className="view-header">
            <button onClick={onBack} className="back-button">&lsaquo;</button>
            <h1>{league.name}</h1>
        </header>
        {league.matches.map(match => (
            <div key={match.id} className="list-item" onClick={() => onMatchSelect({ ...match, leagueName: league.name })}>
                <span>{match.teamA} vs {match.teamB}</span>
                <span className="arrow">&rsaquo;</span>
            </div>
        ))}
    </div>
);

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


// --- Reusable UI Components (from previous step, unchanged) ---

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