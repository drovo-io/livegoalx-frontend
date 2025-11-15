// src/App.jsx
import { useState } from 'react'; // <-- Import useState
import './App.css';
import { matchData } from './mockData';

// We pass down the selection state and a handler function
const OddButton = ({ label, value, isSelected, onSelect }) => {
  const className = `odd-button ${isSelected ? 'selected' : ''}`;
  return (
    <div className={className} onClick={onSelect}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
};

const MarketGroup = ({ name, odds, selection, onOddSelect }) => (
  <div className="market-group">
    <h2 className="market-title">{name}</h2>
    <div className="odds-container">
      {odds.map((odd) => (
        <OddButton
          key={odd.label}
          label={odd.label}
          value={odd.value}
          // Check if the current odd is the selected one
          isSelected={selection?.label === odd.label}
          // Pass a function to handle the click event
          onSelect={() => onOddSelect({ marketName: name, ...odd })}
        />
      ))}
    </div>
  </div>
);

function App() {
  // State to hold the currently selected odd object
  const [selection, setSelection] = useState(null);

  const handleOddSelect = (selectedOdd) => {
    // If the same odd is clicked again, deselect it. Otherwise, set the new selection.
    setSelection(prev => (prev?.label === selectedOdd.label ? null : selectedOdd));
  };

  return (
    <div className="app-container">
      <header className="match-header">
        <h1>{matchData.teamA} vs {matchData.teamB}</h1>
      </header>
      <main>
        {matchData.markets.map((market) => (
          <MarketGroup
            key={market.name}
            name={market.name}
            odds={market.odds}
            selection={selection}
            onOddSelect={handleOddSelect}
          />
        ))}
      </main>

      {/* --- Bet Slip Preview --- */}
      {selection && (
        <footer className="bet-slip-preview">
          <p>
            <span>Your Pick: <strong>{selection.label}</strong></span>
            <span>@{selection.value}</span>
          </p>
          <button className="place-bet-button">Place Bet</button>
        </footer>
      )}
    </div>
  );
}

export default App;