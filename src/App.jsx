// src/App.jsx
import { useState } from 'react';
import './App.css';
import { leagues } from './mockData';

// --- Icon Components (Simple SVGs) ---
const ProfileIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>;
const SportsIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15-3.5-3.5 1.41-1.41L11 13.17l4.59-4.59L17 10l-6 6z" /></svg>;
const WalletIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>;

// --- Main App Layout ---
const Layout = ({ activePage, setActivePage, children }) => (
  <div className="main-layout">
    <header className="app-header">
      <button className="header-btn profile-btn" onClick={() => setActivePage('PROFILE')}><ProfileIcon /></button>
      <div className="balance-display">
        <span className="currency-icon">🪙</span>
        <span>1,000.00</span>
      </div>
      <div className="logo">LiveGoalX</div>
    </header>
    <main className="content-area">
      {children}
    </main>
    <footer className="app-footer">
      <nav className="bottom-nav">
        <button className={activePage === 'SPORTS' ? 'active' : ''} onClick={() => setActivePage('SPORTS')}>
          <SportsIcon />
          <span>Sports</span>
        </button>
        <button className={activePage === 'WALLET' ? 'active' : ''} onClick={() => setActivePage('WALLET')}>
          <WalletIcon />
          <span>Wallet</span>
        </button>
      </nav>
    </footer>
  </div>
);

// --- Page Components ---
const SportsPage = () => {
    // This is our previous App logic, now self-contained in a component
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
};

const PlaceholderPage = ({ title }) => (
    <div className="placeholder-page">
        <h1>{title}</h1>
        <p>This page is under construction.</p>
    </div>
);

// --- Main Controller ---
function App() {
  const [activePage, setActivePage] = useState('SPORTS');

  const renderPage = () => {
    switch (activePage) {
      case 'SPORTS':
        return <SportsPage />;
      case 'WALLET':
        return <PlaceholderPage title="Wallet" />;
      case 'PROFILE':
        return <PlaceholderPage title="Profile (Wins/Losses)" />;
      default:
        return <SportsPage />;
    }
  };

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      {renderPage()}
    </Layout>
  );
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