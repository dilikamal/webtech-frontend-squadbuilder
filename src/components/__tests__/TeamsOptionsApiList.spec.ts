import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TeamsOptionsApiList from '../TeamsOptionsApiList.vue'
import axios from 'axios'

// Mock axios
vi.mock('axios')
const mockedAxios = axios as typeof axios & {
  get: ReturnType<typeof vi.fn>,
  post: ReturnType<typeof vi.fn>,
  delete: ReturnType<typeof vi.fn>,
}

describe('TeamsOptionsApiList', () => {
  beforeEach(() => {
    mockedAxios.get.mockReset()
    mockedAxios.post.mockReset()
    mockedAxios.delete.mockReset()
  })

  it('renders properly and fetches initial teams', async () => {
    const teams = [
      { tactic: 'Tiki-Taka', formation: '4-3-3', players: ['Player1', 'Player2'], id: 1 },
      { tactic: 'Catenaccio', formation: '5-3-2', players: ['Player3', 'Player4'], id: 2 }
    ]
    mockedAxios.get.mockResolvedValueOnce({ data: teams })

    const wrapper = mount(TeamsOptionsApiList)

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Team erstellen')
    expect(wrapper.text()).toContain('Tiki-Taka')
    expect(wrapper.text()).toContain('Catenaccio')
  })

  it('adds a new team', async () => {
    const newTeam = { tactic: 'Gegenpressing', formation: '4-4-2', players: ['Player1'], id: 3 }
    mockedAxios.post.mockResolvedValueOnce({ data: newTeam })

    const wrapper = mount(TeamsOptionsApiList)

    await wrapper.setData({
      tacticField: 'Gegenpressing',
      formationField: '4-4-2',
      playersField: ['Player1']
    })

    await wrapper.find('form').trigger('submit.prevent')

    expect(mockedAxios.post).toHaveBeenCalledWith(expect.any(String), {
      tactic: 'Gegenpressing',
      formation: '4-4-2',
      players: ['Player1']
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Gegenpressing')
    expect(wrapper.text()).toContain('4-4-2')
    expect(wrapper.text()).toContain('Player1')
  })

  // New test for checking maximum number of players
  it('shows warning when adding more than 11 players', async () => {
    const wrapper = mount(TeamsOptionsApiList)

    for (let i = 1; i <= 11; i++) {
      await wrapper.setData({
        currentPlayerField: `Player${i}`
      })
      await wrapper.find('button.btn-primary').trigger('click')
      await wrapper.vm.$nextTick()
    }

    await wrapper.setData({
      currentPlayerField: 'Player12'
    })

    window.alert = vi.fn()
    await wrapper.find('button.btn-primary').trigger('click')
    await wrapper.vm.$nextTick()

    expect(window.alert).toHaveBeenCalledWith('Nicht mehr als 11 Spieler erlaubt.')
    expect(wrapper.text()).not.toContain('Player12')
  })
})
