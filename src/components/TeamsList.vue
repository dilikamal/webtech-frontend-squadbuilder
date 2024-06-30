<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import axios from 'axios'

defineProps<{ title: string }>()

type Player = string; // Name des Spielers als String
type Team = {
  tactic: string;
  formation: string;
  players: Player[];
  id: number; // assuming each team has an ID for deletion purposes
};

const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL;

const teams: Ref<Team[]> = ref([]);

async function initTeams(): Promise<void> {
  try {
    const response = await axios.get<Team[]>(`${baseUrl}/teams`);
    teams.value = response.data;
  } catch (error) {
    console.error('Error fetching teams:', error);
  }
}

async function removeTeam(index: number): Promise<void> {
  const teamId = teams.value[index].id;
  try {
    await axios.delete(`${baseUrl}/teams/${teamId}`);
    teams.value.splice(index, 1);
  } catch (error) {
    console.error('Error removing team:', error);
  }
}

onMounted(() => {
  initTeams();
});
</script>

<template>
  <h2>{{ title }}</h2>
  <ul>
    <li v-for="(team, index) in teams" :key="index">
      <div>Taktik: {{ team.tactic }}, Formation: {{ team.formation }}</div>
      <div>Spieler: {{ team.players.join(', ') }}</div>
      <button @click="removeTeam(index)">Team entfernen</button>
    </li>
  </ul>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #ff4d4d;
  color: white;
  border: none;
}
</style>
