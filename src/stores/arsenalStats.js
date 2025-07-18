import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useArsenalStatsStore = defineStore('arsenalStats', () => {
  const stats = ref({
    season: "2023/2024",
    players: [
      {
        name: "Bukayo Saka",
        position: "Midfielder",
        goals: 20,
        assists: 13,
        appearances: 47
      },
      {
        name: "Leandro Trossard",
        position: "Forward",
        goals: 17,
        assists: 2,
        appearances: 47
      },
      {
        name: "Martin Ødegaard",
        position: "Midfielder",
        goals: 11,
        assists: 8,
        appearances: 46
      },
      {
        name: "Kai Havertz",
        position: "Midfielder",
        goals: 13,
        assists: 7,
        appearances: 51
      },
      {
        name: "Gabriel Martinelli",
        position: "Forward",
        goals: 8,
        assists: 5,
        appearances: 44
      }
    ],
    matches: [
      { matchDay: 1, opponent: "Nottingham Forest", goalsScored: 2, goalsConceded: 1, result: "Win" },
      { matchDay: 2, opponent: "Crystal Palace", goalsScored: 1, goalsConceded: 0, result: "Win" },
      { matchDay: 3, opponent: "Fulham", goalsScored: 2, goalsConceded: 2, result: "Draw" },
      { matchDay: 4, opponent: "Manchester United", goalsScored: 3, goalsConceded: 1, result: "Win" },
      { matchDay: 5, opponent: "Everton", goalsScored: 1, goalsConceded: 0, result: "Win" },
      { matchDay: 6, opponent: "Tottenham Hotspur", goalsScored: 2, goalsConceded: 2, result: "Draw" },
      { matchDay: 7, opponent: "Bournemouth", goalsScored: 4, goalsConceded: 0, result: "Win" },
      { matchDay: 8, opponent: "Manchester City", goalsScored: 1, goalsConceded: 0, result: "Win" },
      { matchDay: 9, opponent: "Chelsea", goalsScored: 2, goalsConceded: 2, result: "Draw" },
      { matchDay: 10, opponent: "Sheffield United", goalsScored: 5, goalsConceded: 0, result: "Win" },
      { matchDay: 11, opponent: "Newcastle United", goalsScored: 0, goalsConceded: 1, result: "Loss" },
      { matchDay: 12, opponent: "Burnley", goalsScored: 3, goalsConceded: 1, result: "Win" },
      { matchDay: 13, opponent: "Brentford", goalsScored: 1, goalsConceded: 0, result: "Win" },
      { matchDay: 14, opponent: "Wolverhampton Wanderers", goalsScored: 2, goalsConceded: 1, result: "Win" },
      { matchDay: 15, opponent: "Luton Town", goalsScored: 4, goalsConceded: 3, result: "Win" },
      { matchDay: 16, opponent: "Aston Villa", goalsScored: 0, goalsConceded: 1, result: "Loss" },
      { matchDay: 17, opponent: "Brighton", goalsScored: 2, goalsConceded: 0, result: "Win" },
      { matchDay: 18, opponent: "Liverpool", goalsScored: 1, goalsConceded: 1, result: "Draw" },
      { matchDay: 19, opponent: "West Ham United", goalsScored: 0, goalsConceded: 2, result: "Loss" },
      { matchDay: 20, opponent: "Fulham", goalsScored: 1, goalsConceded: 2, result: "Loss" },
      { matchDay: 21, opponent: "Crystal Palace", goalsScored: 5, goalsConceded: 0, result: "Win" },
      { matchDay: 22, opponent: "Nottingham Forest", goalsScored: 2, goalsConceded: 1, result: "Win" },
      { matchDay: 23, opponent: "Liverpool", goalsScored: 3, goalsConceded: 1, result: "Win" },
      { matchDay: 24, opponent: "West Ham United", goalsScored: 6, goalsConceded: 0, result: "Win" },
      { matchDay: 25, opponent: "Burnley", goalsScored: 5, goalsConceded: 0, result: "Win" },
      { matchDay: 26, opponent: "Newcastle United", goalsScored: 4, goalsConceded: 1, result: "Win" },
      { matchDay: 27, opponent: "Sheffield United", goalsScored: 6, goalsConceded: 0, result: "Win" },
      { matchDay: 28, opponent: "Brentford", goalsScored: 2, goalsConceded: 1, result: "Win" },
      { matchDay: 29, opponent: "Chelsea", goalsScored: 5, goalsConceded: 0, result: "Win" },
      { matchDay: 30, opponent: "Manchester City", goalsScored: 0, goalsConceded: 0, result: "Draw" },
      { matchDay: 31, opponent: "Luton Town", goalsScored: 2, goalsConceded: 0, result: "Win" },
      { matchDay: 32, opponent: "Brighton", goalsScored: 3, goalsConceded: 0, result: "Win" },
      { matchDay: 33, opponent: "Aston Villa", goalsScored: 0, goalsConceded: 2, result: "Loss" },
      { matchDay: 34, opponent: "Wolverhampton Wanderers", goalsScored: 2, goalsConceded: 0, result: "Win" },
      { matchDay: 35, opponent: "Tottenham Hotspur", goalsScored: 3, goalsConceded: 2, result: "Win" },
      { matchDay: 36, opponent: "Bournemouth", goalsScored: 3, goalsConceded: 0, result: "Win" },
      { matchDay: 37, opponent: "Manchester United", goalsScored: 1, goalsConceded: 0, result: "Win" },
      { matchDay: 38, opponent: "Everton", goalsScored: 2, goalsConceded: 1, result: "Win" }
    ]

  })  

 
  return {
    stats
  }
})
