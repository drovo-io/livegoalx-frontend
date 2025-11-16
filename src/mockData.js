// src/mockData.js

// Reusable market templates for consistency
const defaultMarkets = [
  {
    name: "Full Time Result",
    odds: [ { label: "1", value: "2.50" }, { label: "X", value: "3.10" }, { label: "2", value: "2.90" } ],
  },
  {
    name: "Total Goals",
    odds: [ { label: "Over (2.5)", value: "1.90" }, { label: "Under (2.5)", value: "1.90" } ],
  },
];

export const leagues = [
  {
    name: "Premier League",
    matches: [
      { id: 101, teamA: "Arsenal", teamB: "Tottenham", markets: defaultMarkets },
      { id: 102, teamA: "Man City", teamB: "Liverpool", markets: [
        { name: "Full Time Result", odds: [ { label: "1", value: "1.80" }, { label: "X", value: "3.50" }, { label: "2", value: "4.00" } ]},
        { name: "Double Chance", odds: [ { label: "1X", value: "1.22" }, { label: "12", value: "1.28" }, { label: "2X", value: "1.95" } ]},
        { name: "Total Goals", odds: [ { label: "Over (2.5)", value: "1.70" }, { label: "Under (2.5)", value: "2.10" } ]},
      ]},
    ],
  },
  {
    name: "La Liga",
    matches: [
      { id: 201, teamA: "Real Madrid", teamB: "Barcelona", markets: defaultMarkets },
    ],
  },
  {
    name: "Saudi Pro League",
    matches: [
        { id: 301, teamA: "Al-Nassr", teamB: "Al-Hilal", markets: defaultMarkets },
        { id: 302, teamA: "Al-Ittihad", teamB: "Al-Ahli", markets: defaultMarkets },
    ]
  },
  {
    name: "Ligue 1",
    matches: [], // Example of a league with no current matches
  },
  // Add other leagues here...
  { name: "Bundesliga", matches: [] },
  { name: "Serie A", matches: [] },
  { name: "Persian Gulf Pro League", matches: [] },
  { name: "Russian Premier League", matches: [] },
  { name: "Chinese Super League", matches: [] },
];