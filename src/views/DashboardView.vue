<template>
  <div class="dashboard-container">
    <h1 class="main-title">{{ text.title }}</h1>

    <!-- Language Selector -->
    <div class="language-selector-wrapper">
      <SelectButton
        v-model="language"
        :options="languageOptions"
        option-label="name"
        data-key="value"
        class="language-select-button"
      />
    </div>

    <!-- Player Stats Section -->
    <section class="card-section">
      <h2 class="section-title">{{ text.playerStats }}</h2>
      <div class="metric-selector-wrapper">
        <label for="playerMetric" class="metric-label">{{ text.selectMetric }}:</label>
        <Dropdown
          id="playerMetric"
          v-model="selectedPlayerMetric"
          :options="playerMetricsOptions"
          option-label="label"
          option-value="value"
          class="metric-dropdown"
        />
      </div>
      <div class="chart-container">
        <Chart type="bar" :data="computedPlayerChartData" :options="computedChartOptions" class="player-bar-chart" />
      </div>
    </section>

    <!-- Match Results Table -->
    <section class="card-section">
      <h2 class="section-title">{{ text.matchResults }}</h2>
      <DataTable
        :value="store.stats.matches"
        tableStyle="min-width: 50rem"
        class="match-results-table"
      >
        <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" />
      </DataTable>
    </section>

    <!-- Result Distribution Pie Chart -->
    <section class="card-section center-content">
      <div class="chart-wrapper">
        <h2 class="section-title text-center">{{ text.resultDistribution }}</h2>
        <Chart type="pie" :data="computedResultDistributionData" :options="computedPieChartOptions" />
      </div>
    </section>

    <!-- Goals Over Season Line Chart -->
    <section class="card-section">
      <h2 class="section-title">{{ text.goalsOverSeason }}</h2>
      <div class="chart-container">
        <Chart type="line" :data="computedGoalsOverSeasonData" :options="computedChartOptions" class="goals-line-chart" />
      </div>
    </section>

    <!-- Top Scorers Table -->
    <section class="card-section">
      <h2 class="section-title">{{ text.topScorers }}</h2>
      <DataTable
        :value="store.stats.players.sort((a, b) => b.goals - a.goals)"
        tableStyle="min-width: 30rem"
        class="top-scorers-table"
      >
        <Column field="name" :header="text.playerName" />
        <Column field="goals" :header="text.goals" />
        <Column field="assists" :header="text.assists" />
      </DataTable>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useArsenalStatsStore } from '../stores/arsenalStats.js' 
import Chart from 'primevue/chart'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import SelectButton from 'primevue/selectbutton'
import Dropdown from 'primevue/dropdown'

// Language switch
const language = ref({ name: 'English', value: 'en' })
const languageOptions = ref([
  { name: 'English', value: 'en' },
  { name: 'Français', value: 'fr' }
])

// Text content for different languages
const en = {
  title: 'Arsenal FC Dashboard',
  goals: 'Goals',
  assists: 'Assists',
  appearances: 'Appearances',
  matchDay: 'Match Day',
  opponent: 'Opponent',
  goalsScored: 'Goals Scored',
  goalsConceded: 'Goals Conceded',
  result: 'Result',
  win: 'Win',
  draw: 'Draw',
  loss: 'Loss',
  playerStats: 'Player Statistics',
  selectMetric: 'Select Metric',
  matchResults: 'Match Results',
  resultDistribution: 'Result Distribution',
  goalsOverSeason: 'Goals Scored & Conceded Over Season',
  topScorers: 'Top Scorers',
  playerName: 'Player Name'
}
const fr = {
  title: 'Tableau de Bord d\'Arsenal FC',
  goals: 'Buts',
  assists: 'Passes Décisives',
  appearances: 'Apparitions',
  matchDay: 'Journée',
  opponent: 'Adversaire',
  goalsScored: 'Buts Marqués',
  goalsConceded: 'Buts Encaissés',
  result: 'Résultat',
  win: 'Victoire',
  draw: 'Nul',
  loss: 'Défaite',
  playerStats: 'Statistiques des Joueurs',
  selectMetric: 'Sélectionner une Métrique',
  matchResults: 'Résultats des Matchs',
  resultDistribution: 'Distribution des Résultats',
  goalsOverSeason: 'Buts Marqués et Encaissés au Fil de la Saison',
  topScorers: 'Meilleurs Buteurs',
  playerName: 'Nom du Joueur'
}
const text = computed(() => (language.value.value === 'en' ? en : fr))

const store = useArsenalStatsStore()

// Table columns for match results
const columns = computed(() => [
  { field: 'matchDay', header: text.value.matchDay },
  { field: 'opponent', header: text.value.opponent },
  { field: 'goalsScored', header: text.value.goalsScored },
  { field: 'goalsConceded', header: text.value.goalsConceded },
  { field: 'result', header: text.value.result }
])

// Player metric selection for the bar chart
const selectedPlayerMetric = ref('goals') // Default selected metric
const playerMetricsOptions = computed(() => [
  { label: text.value.goals, value: 'goals' },
  { label: text.value.assists, value: 'assists' },
  { label: text.value.appearances, value: 'appearances' }
])

// Computed data for Player Stats Bar Chart (dynamic based on selectedPlayerMetric)
const computedPlayerChartData = computed(() => ({
  labels: store.stats.players.map((p) => p.name),
  datasets: [
    {
      label: text.value[selectedPlayerMetric.value], // Dynamic label
      data: store.stats.players.map((p) => p[selectedPlayerMetric.value]), // Dynamic data
      backgroundColor: '#FFFFFF',
      borderColor: '#333333', 
      borderWidth: 2,
      borderSkipped: false 
    }
  ]
}))

// Common chart options for bar and line charts
const computedChartOptions = computed(() => {
  const textColorSecondary = '#eee'
  const surfaceBorder = 'rgba(255, 255, 255, 0.27)' 
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#fff' 
        }
      }
    },
    scales: {
      x: {
        ticks: { color: textColorSecondary },
        grid: { color: surfaceBorder },
        title: {
          display: true,
          color: '#fff',
          font: {
            weight: 'bold'
          }
        }
      },
      y: {
        beginAtZero: true,
        ticks: { color: textColorSecondary },
        grid: { color: surfaceBorder },
        title: {
          display: true,
          color: '#fff',
          font: {
            weight: 'bold'
          }
        }
      }
    }
  }
})

// Computed data for Result Distribution Pie Chart
const computedResultDistributionData = computed(() => {
  const wins = store.stats.matches.filter((m) => m.result === 'Win').length
  const draws = store.stats.matches.filter((m) => m.result === 'Draw').length 
  const losses = store.stats.matches.filter((m) => m.result === 'Loss').length

  return {
    labels: [text.value.win, text.value.draw, text.value.loss],
    datasets: [
      {
        data: [wins, draws, losses],
        backgroundColor: ['#db0007', '#ffc107', '#808080'], 
        hoverBackgroundColor: ['#a40000', '#e0a800', '#696969'] 
      }
    ]
  }
})

// Options for Pie Chart
const computedPieChartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        color: '#fff' 
      }
    }
  }
}))

// Computed data for Goals Over Season Line Chart
const computedGoalsOverSeasonData = computed(() => {
  const matchDays = store.stats.matches.map((m) => m.matchDay)
  const goalsScored = store.stats.matches.map((m) => m.goalsScored)
  const goalsConceded = store.stats.matches.map((m) => m.goalsConceded)

  return {
    labels: matchDays,
    datasets: [
      {
        label: text.value.goalsScored,
        data: goalsScored,
        fill: false,
        borderColor: '#00bfff', 
        tension: 0.4
      },
      {
        label: text.value.goalsConceded,
        data: goalsConceded,
        fill: false,
        borderColor: '#ffae42', 
        tension: 0.4
      }
    ]
  }
})
</script>

<style scoped>
/* Scoped styles for DashboardView.vue */
.dashboard-container {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #8b0000, #b22222); /* Darker red to slightly lighter red gradient */
  color: #fff;
  padding: 1rem 2rem;
  font-family: 'Inter', sans-serif;
}

.main-title {
  font-size: 2.5rem;
  font-weight: 800; /* Extra bold */
  text-align: center;
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
}

.language-selector-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.language-select-button .p-button {
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
  padding: 0.5rem 1rem;
}

.language-select-button .p-button.p-highlight {
  background-color: #fff !important;
  color: #db0007 !important;
  font-weight: bold;
}

.language-select-button .p-button:not(.p-highlight) {
  background-color: #db0007 !important;
  color: #fff !important;
}

.language-select-button .p-button:not(.p-highlight):hover {
  background-color: #a40000 !important; /* Darker red on hover */
}

.card-section {
  background-color: #db0007; /* Arsenal Red */
  padding: 1.5rem;
  border-radius: 0.75rem; /* rounded-xl */
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); /* shadow-xl */
  margin-bottom: 2rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 600; /* Semi-bold */
  margin-bottom: 1.5rem;
  color: #fff;
}

.metric-selector-wrapper {
  margin-bottom: 1.5rem;
}

.metric-label {
  display: block;
  color: #fff;
  font-size: 1.125rem; /* text-lg */
  font-weight: 500; /* Medium font weight */
  margin-bottom: 0.5rem;
}

.metric-dropdown {
  width: 100%; /* w-full */
  max-width: 14rem; /* md:w-56 */
  border-radius: 0.5rem; /* rounded-lg */
  background-color: #a40000 !important; /* Darker red for dropdown */
  color: #fff !important;
  border: 1px solid #8b0000 !important; /* Even darker red border */
}

.metric-dropdown .p-dropdown-label {
  color: #fff !important;
}

.metric-dropdown .p-dropdown-trigger {
  color: #fff !important;
}

.metric-dropdown .p-dropdown-panel {
  background-color: #a40000 !important;
  border: 1px solid #8b0000 !important;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.metric-dropdown .p-dropdown-item {
  color: #fff !important;
}

.metric-dropdown .p-dropdown-item:hover {
  background-color: #8b0000 !important; /* Darkest red on hover */
}

.metric-dropdown .p-dropdown-item.p-highlight {
  background-color: #6a0000 !important; /* Selected item background */
}

.chart-container {
  position: relative;
  height: 400px; /* Increased height for charts */
  width: 100%;
}

.player-bar-chart,
.goals-line-chart {
  height: 100% !important; /* Make chart fill its container */
  width: 100% !important;
}

.match-results-table,
.top-scorers-table {
  border-radius: 0.75rem; /* rounded-lg */
  overflow: hidden;
  border: 1px solid #a40000;
}

/* Specific styling for the match results table to make it smaller and scrollable */
.match-results-table .p-datatable-wrapper {
  max-height: 300px; /* Set a max height for the table body */
  overflow-y: auto; /* Enable vertical scrolling */
}

.p-datatable .p-datatable-thead > tr > th {
  background-color: #a40000 !important; /* Darker red for header */
  color: #fff !important;
  font-weight: bold;
  padding: 1rem;
}

.p-datatable .p-datatable-tbody > tr > td {
  background-color: #db0007 !important; /* Arsenal Red for body cells */
  color: #fff !important;
  padding: 1rem;
  border-bottom: 1px solid #a40000 !important; /* Darker red for cell borders */
}

.p-datatable .p-datatable-tbody > tr:last-child > td {
  border-bottom: none !important; /* No border for the last row */
}

.p-datatable .p-datatable-tbody > tr:nth-child(even) > td {
  background-color: #c00000 !important; /* Slightly different red for even rows */
}

.center-content {
  display: flex;
  justify-content: center;
}

.chart-wrapper {
  width: 100%;
  max-width: 30rem; /* md:w-[30rem] */
}

.text-center {
  text-align: center;
}
</style>
