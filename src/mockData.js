// src/mockData.js
export const matchData = {
  teamA: "Manchester United",
  teamB: "Chelsea",
  markets: [
    {
      name: "Full Time Result",
      odds: [
        { label: "1", value: "3.00" },
        { label: "X", value: "2.65" },
        { label: "2", value: "2.87" },
      ],
    },
    {
      name: "Double Chance",
      odds: [
        { label: "1X", value: "1.34" },
        { label: "12", value: "1.39" },
        { label: "2X", value: "1.33" },
      ],
    },
    {
      name: "Total Goals",
      odds: [
        { label: "Over (3.5)", value: "1.37" },
        { label: "Under (3.5)", value: "3.05" },
        { label: "Over (4.5)", value: "2.60" },
        { label: "Under (4.5)", value: "1.50" },
        { label: "Over (5.5)", value: "6.70" },
        { label: "Under (5.5)", value: "1.10" },
      ],
    },
  ],
};