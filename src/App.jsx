// src/App.jsx
import './App.css';
import { matchData } from './mockData';

const OddButton = ({ label, value }) => (
  <div className="odd-button">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

const MarketGroup = ({ name, odds }) => (
  <div className="market-group">
    <h2 className="market-title">{name}</h2>
    <div className="odds-container">
      {odds.map((odd) => (
        <OddButton key={odd.label} label={odd.label} value={odd.value} />
      ))}
    </div>
  </div>
);

function App() {
  return (
    <div className="app-container">
      <header className="match-header">
        <h1>{matchData.teamA} vs {matchData.teamB}</h1>
      </header>
      <main>
        {matchData.markets.map((market) => (
          <MarketGroup key={market.name} name={market.name} odds={market.odds} />
        ))}
      </main>
    </div>
  );
}

export default App;