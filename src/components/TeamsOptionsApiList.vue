<script lang="ts">
import { defineComponent, onMounted, ref, type Ref } from 'vue'
import axios from 'axios'

type Player = string;
type Team = {
  tactic: string;
  formation: string;
  players: Player[];
  id: number;
}
type TeamsListOaData = {
  teams: Team[];
  tacticField: string;
  formationField: string;
  playersField: Player[];
  currentPlayerField: string;
  currentTeamId: number;
}

const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL;

export default defineComponent({
  name: 'TeamsOptionsApiList',
  data(): TeamsListOaData {
    return {
      teams: [],
      tacticField: '',
      formationField: '0',
      playersField: [],
      currentPlayerField: '',
      currentTeamId: 1
    }
  },
  methods: {
    async initTeams(): Promise<void> {
      try {
        const response = await axios.get<Team[]>(`${baseUrl}/teams-oa`);
        this.teams = response.data;
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    },
    async addTeam(): Promise<void> {
      if (this.playersField.length <= 11) {
        const newTeam = {
          tactic: this.tacticField,
          formation: this.formationField,
          players: [...this.playersField]
        };
        try {
          const response = await axios.post(`${baseUrl}/teams-oa`, newTeam);
          this.teams.push(response.data);
          // Reset fields after adding
          this.tacticField = '';
          this.formationField = '0';
          this.playersField = [];
        } catch (error) {
          console.error('Error adding team:', error);
        }
      } else {
        alert("Ein Team kann maximal 11 Spieler haben.");
      }
    },
    async removeTeam(index: number): Promise<void> {
      const teamId = this.teams[index].id;
      try {
        await axios.delete(`${baseUrl}/teams-oa/${teamId}`);
        this.teams.splice(index, 1);
      } catch (error) {
        console.error('Error removing team:', error);
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
  <div class="container squad-builder">
    <h1 class="text-center">Team erstellen</h1>
    <form @submit.prevent="addTeam" class="team-form">
      <div class="form-row mb-3">
        <div class="col">
          <select v-model="tacticField" class="form-control">
            <option disabled value="">Taktik</option>
            <option value="Park the Bus">Park the Bus</option>
            <option value="Gegenpressing">Gegenpressing (Counter-Pressing)</option>
            <option value="Tiki-Taka">Tiki-Taka</option>
            <option value="Catenaccio">Catenaccio</option>
            <option value="Flügelspiel">Flügelspiel</option>
            <option value="Langball">Langball (Long Ball)</option>
            <option value="False Nine">False Nine</option>
            <option value="Pressing">Pressing</option>
            <option value="Konterspiel">Konterspiel (Counter-Attacking)</option>
            <option value="Totaler Fußball">Totaler Fußball (Total Football)</option>
          </select>
        </div>
        <div class="col">
          <select v-model="formationField" class="form-control">
            <option disabled value="0">Formation</option>
            <option value="4-4-2">4-4-2</option>
            <option value="4-3-3">4-3-3</option>
            <option value="3-5-2">3-5-2</option>
            <option value="4-2-3-1">4-2-3-1</option>
            <option value="3-4-3">3-4-3</option>
            <option value="5-3-2">5-3-2</option>
            <option value="4-1-4-1">4-1-4-1</option>
          </select>
        </div>
      </div>
      <div v-for="(player, index) in playersField" :key="index" class="form-row mb-2 align-items-center">
        <div class="col-10">
          <input type="text" v-model="playersField[index]" class="form-control" readonly />
        </div>
        <div class="col-2 text-right">
          <button @click.prevent="removePlayer(index)" class="btn btn-danger">Entfernen</button>
        </div>
      </div>
      <div class="form-row mb-3 align-items-center">
        <div class="col-8">
          <input type="text" placeholder="Spieler hinzufügen" v-model="currentPlayerField" class="form-control" />
        </div>
        <div class="col-4 text-right">
          <button @click.prevent="addPlayer" class="btn btn-primary btn-sm">hinzufügen</button>
        </div>
      </div>
      <button type="submit" class="btn btn-success btn-block mb-3">Team hinzufügen</button>
    </form>

    <h2 class="output-title">Teams</h2>
    <div class="teams-grid">
      <div v-for="(team, index) in teams" :key="index" class="team-card">
        <div><strong>Taktik:</strong> {{ team.tactic }}, Formation: {{ team.formation }}</div>
        <div>Spieler: {{ team.players.join(', ') }}</div>
        <button @click="removeTeam(index)" class="btn btn-danger btn-sm mt-2">Team entfernen</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.squad-builder {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.team-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.form-control {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.form-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.btn-block {
  width: 100%;
}

.btn {
  padding: 10px 10px;
  font-size: 1rem;
  border-radius: 15px;
}

.btn-success {
  background-color: green;
  border: none;
  color: white;
}

.btn-primary {
  border: none;
  color: white;
  margin: 0;
}

h1 {
  color: #A71C85;
  font-size: 4rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  font-weight: bold;
}

ul {
  list-style-type: none;
  padding: 0;
}

.teams-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 10px;
}

.team-card {
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 2rem;
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
  color: white;
  border: none;
}

.output-title {
  color: #A71C85;
  font-size: 2rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  font-weight: bold;

}


.btn-danger {
  background-color: #ff4d4d;
  margin-left: 0;
}

.btn-success {
  margin: 0;
}




</style>
