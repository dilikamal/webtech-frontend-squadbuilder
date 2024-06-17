<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'

defineProps<{ title: string }>()

type Player = string; // Name des Spielers als String
type Team = {
  tactic: string;
  formation: string;
  players: Player[];
};

const teams: Ref<Team[]> = ref([]); // Initialisierung der Teams-Liste
const tacticField = ref(''); // Taktik als String
const formationField = ref(0); // Formation als Zahl
const playersField = ref([]); // Spielerliste, initial leer
let currentPlayerField = ref(''); // Aktuell hinzuzufügender Spieler


function initTeams(): void {
  teams.value.push({
    tactic: 'Offensive',
    formation: '433',
    players: ['Player 1', 'Player 2']
  });
}

function addTeam(): void {
  if (playersField.value.length <= 11) {
    teams.value.push({
      tactic: tacticField.value,
    formation: formationField.value.toString(),
      players: [...playersField.value]
    });
  } else {
    alert("Teams können nicht mehr als 11 Spieler haben.");
  }
}

function addPlayer(): void {
  if (playersField.value.length < 11) {
    const playersField = ref<string[]>([]); // Define playersField as an array of strings
    playersField.value.push(currentPlayerField.value);
    currentPlayerField.value = '';
  } else {
    alert("Nicht mehr als 11 Spieler erlaubt.");
  }
}

function removeTeam(index: number): void {
  teams.value.splice(index, 1);
}

function removePlayer(index: number): void {
  playersField.value.splice(index, 1);
}



onMounted(() => {
  initTeams();
})
</script>

<template>
  <h2>{{ title }}</h2>
  <form @submit.prevent="addTeam">
    <input type="text" placeholder="Taktik" v-model="tacticField" />
    <input type="number" placeholder="Formation" v-model="formationField" />
    <div v-for="(player, index) in playersField" :key="index">
      {{ player }} <button @click.prevent="removePlayer(index)">Remove</button>
    </div>
    <input type="text" placeholder="Spieler hinzufügen" v-model="currentPlayerField" />
    <button @click.prevent="addPlayer">Spieler hinzufügen</button>
    <button>Team hinzufügen</button>
  </form>
  <hr />
  <ul>
    <li v-for="(team, index) in teams" :key="index">
      <div>Taktik: {{ team.tactic }}, Formation: {{ team.formation }}</div>
      <div>Spieler: {{ team.players.join(', ') }}</div>
      <button @click="removeTeam(index)">Team entfernen</button>
    </li>
  </ul>
</template>

<style scoped>
/* Dein bestehender CSS-Code kann hier übernommen werden. */
</style>
