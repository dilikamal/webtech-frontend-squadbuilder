<script lang="ts">
import { defineComponent } from 'vue'

type Player = string; // Name des Spielers als String
type Team = {
  tactic: string;
  formation: number;
  players: Player[];
}
type TeamsListOaData = {
  teams: Team[];
  tacticField: string;
  formationField: number;
  playersField: Player[];
  currentPlayerField: string;
  currentTeamId: number;
}

export default defineComponent({
  name: 'TeamsOptionsApiList',
  props: ['title'],
  data(): TeamsListOaData {
    return {
      teams: [],
      tacticField: '',
      formationField: 0,
      playersField: [],
      currentPlayerField: '',
      currentTeamId: 1
    }
  },
  methods: {
    initTeams(): void {
      this.teams.push({
        tactic: 'Defensive',
        formation: 5,
        players: ['Player 1', 'Player 2', 'Player 3']
      })
    },
    addTeam(): void {
      if (this.playersField.length <= 11) {
        this.teams.push({
          tactic: this.tacticField,
          formation: this.formationField,
          players: [...this.playersField]
        });
        // Reset fields after adding
        this.tacticField = '';
        this.formationField = 0;
        this.playersField = [];
      } else {
        alert("Ein Team kann maximal 11 Spieler haben.");
      }
    },
    addPlayer(): void {
      if (this.playersField.length < 11) {
        this.playersField.push(this.currentPlayerField);
        this.currentPlayerField = '';
      } else {
        alert("Nicht mehr als 11 Spieler erlaubt.");
      }
    },
    removeTeam(teamIndex: number): void {
      this.teams.splice(teamIndex, 1);
    },
    removePlayer(playerIndex: number): void {
      this.playersField.splice(playerIndex, 1);
    }
  },
  mounted() {
    this.initTeams();
  }
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
    <button type="submit">Team hinzufügen</button>
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
/* Hier kann der vorhandene CSS-Code verwendet werden. */
</style>
