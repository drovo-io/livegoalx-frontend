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
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
    matches: [
      { id: 101, teamA: "Arsenal", teamB: "Tottenham", markets: defaultMarkets },
      { id: 102, teamA: "Man City", teamB: "Liverpool", markets: [
        { name: "Full Time Result", odds: [ { label: "1", value: "1.80" }, { label: "X", value: "3.50" }, { label: "2", value: "4.00" } ]},
        { name: "Total Goals", odds: [ { label: "Over (2.5)", value: "1.70" }, { label: "Under (2.5)", value: "2.10" } ]},
      ]},
    ],
    table: [
      { pos: 1, team: "Arsenal", p: 12, w: 9, d: 3, l: 0, pts: 30 },
      { pos: 2, team: "Man City", p: 12, w: 9, d: 1, l: 2, pts: 28 },
      { pos: 3, team: "Liverpool", p: 12, w: 8, d: 3, l: 1, pts: 27 },
    ],
  },
  {
    name: "La Liga",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b8/LaLiga_Santander.svg",
    matches: [ { id: 201, teamA: "Real Madrid", teamB: "Barcelona", markets: defaultMarkets } ],
    table: [
        { pos: 1, team: "Girona", p: 13, w: 11, d: 1, l: 1, pts: 34 },
        { pos: 2, team: "Real Madrid", p: 13, w: 10, d: 2, l: 1, pts: 32 },
    ],
  },
    {
    name: "Serie A",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/e/e1/Serie_A_logo_%282022%29.svg",
    matches: [ { id: 301, teamA: "Inter", teamB: "Juventus", markets: defaultMarkets } ],
    table: [ { pos: 1, team: "Inter", p: 12, w: 10, d: 1, l: 1, pts: 31 } ],
  },
  {
    name: "Bundesliga",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg",
    matches: [ { id: 401, teamA: "Bayer Leverkusen", teamB: "Bayern Munich", markets: defaultMarkets } ],
    table: [ { pos: 1, team: "Bayer Leverkusen", p: 11, w: 10, d: 1, l: 0, pts: 31 } ],
  },
  {
    name: "Ligue 1",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Ligue1_Uber_Eats_logo.svg",
    matches: [ { id: 501, teamA: "PSG", teamB: "AS Monaco", markets: defaultMarkets } ],
    table: [ { pos: 1, team: "PSG", p: 12, w: 8, d: 3, l: 1, pts: 27 } ],
  },
  {
    name: "Saudi Pro League",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/1/1b/RSL_Logo_2023-24.svg",
    matches: [ { id: 601, teamA: "Al-Nassr", teamB: "Al-Hilal", markets: defaultMarkets } ],
    table: [ { pos: 1, team: "Al-Hilal", p: 13, w: 11, d: 2, l: 0, pts: 35 } ],
  },
  { name: "Persian Gulf Pro League", logoUrl: null, matches: [], table: [] },
  { name: "Russian Premier League", logoUrl: null, matches: [], table: [] },
  { name: "Chinese Super League", logoUrl: null, matches: [], table: [] },
];