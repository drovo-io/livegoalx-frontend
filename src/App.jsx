// src/App.jsx
import { useState } from 'react';
import './App.css';
import { leagues } from './mockData';

// --- Icon Components ---
const ProfileIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>;
const SportsIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15-3.5-3.5 1.41-1.41L11 13.17l4.59-4.59L17 10l-6 6z" /></svg>;
const WalletIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>;

// --- Main App Layout ---
const Layout = ({ activePage, setActivePage, children }) => (
    <div className="main-layout">
        <header className="app-header">
            <button className="header-btn profile-btn" onClick={() => setActivePage('PROFILE')}><ProfileIcon /></button>
            <div className="balance-display"><span className="currency-icon">🪙</span> 1,000.00</div>
            <div className="logo">LiveGoalX</div>
        </header>
        <main className="content-area">{children}</main>
        <footer className="app-footer">
            <nav className="bottom-nav">
                <button className={activePage === 'SPORTS' ? 'active' : ''} onClick={() => setActivePage('SPORTS')}><SportsIcon /><span>Sports</span></button>
                <button className={activePage === 'WALLET' ? 'active' : ''} onClick={() => setActivePage('WALLET')}><WalletIcon /><span>Wallet</span></button>
            </nav>
        </footer>
    </div>
);

// --- Main Controller ---
function App() {
  const [activePage, setActivePage] = useState('SPORTS');
  const renderPage = () => {
    switch (activePage) {
      case 'SPORTS': return <SportsPage />;
      case 'WALLET': return <PlaceholderPage title="Wallet" />;
      case 'PROFILE': return <PlaceholderPage title="Profile" />;
      default: return <SportsPage />;
    }
  };
  return (<Layout activePage={activePage} setActivePage={setActivePage}>{renderPage()}</Layout>);
}

// =================================================================================
// SPORTS PAGE AND ITS COMPONENTS
// =================================================================================
const SportsPage = () => {
    const [view, setView] = useState('LEAGUES');
    const [context, setContext] = useState(null);
    const [selection, setSelection] = useState(null);

    const navigateTo = (newView, newContext) => {
        setContext(newContext); setView(newView); setSelection(null);
    };

    switch (view) {
        case 'LEAGUE_HUB': return <LeagueHubView league={context} onMatchSelect={(m) => navigateTo('MARKETS', m)} onBack={() => navigateTo('LEAGUES')} />;
        case 'MARKETS':
            const league = leagues.find(l => l.name === context.leagueName);
            return <MarketView match={context} sel={selection} setSel={setSelection} onBack={() => navigateTo('LEAGUE_HUB', league)} />;
        default: return <LeagueListView onLeagueSelect={(l) => navigateTo('LEAGUE_HUB', l)} />;
    }
};

// --- UPDATED LeagueListView Component ---
const LeagueListView = ({ onLeagueSelect }) => (
    <div className="list-view">
        <header className="view-header"><h1>Leagues</h1></header>
        <div className="league-grid">
            {leagues.map(league => (
                <div 
                    key={league.name} 
                    className={`league-grid-item ${!league.logoUrl || league.matches.length === 0 ? 'disabled' : ''}`} 
                    onClick={() => league.logoUrl && league.matches.length > 0 && onLeagueSelect(league)}
                >
                    {league.logoUrl ? (
                        <img src={league.logoUrl} alt={league.name} className="league-grid-logo" />
                    ) : (
                        <div className="logo-placeholder"></div>
                    )}
                    <span className="league-grid-name">{league.name}</span>
                </div>
            ))}
        </div>
    </div>
);

const LeagueHubView = ({ league, onMatchSelect, onBack }) => {
    const [activeTab, setActiveTab] = useState('MATCHES');
    return (
        <div className="list-view">
            <header className="view-header">
                <button onClick={onBack} className="back-button">&lsaquo;</button>
                {league.logoUrl && <img src={league.logoUrl} alt={league.name} className="header-league-logo" />}
                <h1>{league.name}</h1>
            </header>
            <div className="tab-switcher">
                <button onClick={() => setActiveTab('MATCHES')} className={activeTab === 'MATCHES' ? 'active' : ''}>Matches</button>
                <button onClick={() => setActiveTab('TABLE')} className={activeTab === 'TABLE' ? 'active' : ''}>Table</button>
            </div>
            {activeTab === 'MATCHES' && <MatchListContent league={league} onMatchSelect={onMatchSelect} />}
            {activeTab === 'TABLE' && <TableView table={league.table} />}
        </div>
    );
};

const MarketView = ({ match, sel, setSel, onBack }) => {
    const handleOddSelect = (selectedOdd) => {
        setSel(prev => (prev?.label === selectedOdd.label ? null : selectedOdd));
    };
    return (
        <div className="market-view-container">
            <header className="view-header fixed-header">
                <button onClick={onBack} className="back-button">&lsaquo;</button>
                <h1>{match.teamA} vs {match.teamB}</h1>
            </header>
            <main className="market-scroll-area">
                {match.markets.map(market => <MarketGroup key={market.name} {...market} selection={sel} onOddSelect={o => handleOddSelect({ ...o, market: market.name})} />)}
            </main>
            {sel && <BetSlipPreview selection={sel} />}
        </div>
    );
};

const PlaceholderPage = ({ title }) => <div className="placeholder-page"><h1>{title}</h1><p>Under construction.</p></div>;
const MatchListContent = ({ league, onMatchSelect }) => league.matches.length > 0 ? league.matches.map(m => <div key={m.id} className="match-list-item" onClick={() => onMatchSelect({...m, leagueName: league.name})}><span>{m.teamA} vs {m.teamB}</span><span className="arrow">&rsaquo;</span></div>) : <p className="empty-message">No matches available.</p>;
const TableView = ({ table }) => table.length > 0 ? <table className="league-table"><thead><tr><th>#</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>Pts</th></tr></thead><tbody>{table.map(r => <tr key={r.pos}><td>{r.pos}</td><td>{r.team}</td><td>{r.p}</td><td>{r.w}</td><td>{r.d}</td><td>{r.l}</td><td><strong>{r.pts}</strong></td></tr>)}</tbody></table> : <p className="empty-message">Table data unavailable.</p>;
const MarketGroup = ({ name, odds, selection, onOddSelect }) => <div className="market-group"><h2 className="market-title">{name}</h2><div className="odds-container">{odds.map(o => <OddButton key={o.label} {...o} isSelected={selection?.label===o.label} onSelect={() => onOddSelect(o)} />)}</div></div>;
const OddButton = ({ label, value, isSelected, onSelect }) => <div className={`odd-button ${isSelected ? 'selected' : ''}`} onClick={onSelect}><span>{label}</span><span>{value}</span></div>;
const BetSlipPreview = ({ selection }) => <footer className="bet-slip-preview"><p><span>Pick: <strong>{selection.label}</strong></span><span>@{selection.value}</span></p><button className="place-bet-button">Place Bet</button></footer>;

export default App;