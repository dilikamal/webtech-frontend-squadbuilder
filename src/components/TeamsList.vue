<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'

defineProps<{ title: string }>()

type Player = string; // Name des Spielers als String
type Team = {
  tactic: string;
  formation: string;
  players: Player[];
};

export const teams: Ref<Team[]> = ref([]);
export const tacticField = ref<string>('');
export const formationField = ref<string>(''); // Du hast erwähnt, dass Formation eine Zeichenfolge ist, also sollte sie ref<string> sein.
export const playersField = ref<Player[]>([]);
export const currentPlayerField = ref<string>(''); // Auch hier ist currentPlayerField eine Zeichenfolge, also ref<string>.



function initTeams(): void {
  teams.value.push({
    tactic: 'Offensive',
    formation: '433',
    players: ['Player 1', 'Player 2']
  });
}

export function addTeam(): void {
  if (playersField.value.length <= 11) {
    teams.value.push({
      tactic: tacticField.value,
      formation: formationField.value,
      players: [...playersField.value]
    });
    // Felder leeren nach dem Hinzufügen
    tacticField.value = '';
    formationField.value = ('');
    playersField.value = [];
  } else {
    alert("Teams können nicht mehr als 11 Spieler haben.");
  }
}

export function addPlayer(): void {
  if (playersField.value.length < 11) {
    const playersField = ref<string[]>([]); // Define playersField as an array of strings
    playersField.value.push(currentPlayerField.value);
    currentPlayerField.value = '';
  } else {
    alert("Nicht mehr als 11 Spieler erlaubt.");
  }
}

export function removeTeam(index: number): void {
  teams.value.splice(index, 1);
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
