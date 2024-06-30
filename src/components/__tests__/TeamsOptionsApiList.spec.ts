import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TeamsOptionsApiList from '../TeamsOptionsApiList.vue'
import axios from 'axios'

// Mock axios
vi.mock('axios')
const mockedAxios = axios as typeof axios & {
  get: ReturnType<typeof vi.fn>
}

describe('TeamsOptionsApiList', () => {
  beforeEach(() => {
    mockedAxios.get.mockReset()
  })

  it('renders properly and fetches initial teams', async () => {
    // Mock the response of the API
    const teams = [
      { tactic: 'Tiki-Taka', formation: '4-3-3', players: ['Player1', 'Player2'], id: 1 },
      { tactic: 'Catenaccio', formation: '5-3-2', players: ['Player3', 'Player4'], id: 2 }
    ]
    mockedAxios.get.mockResolvedValueOnce({ data: teams })

    const wrapper = mount(TeamsOptionsApiList)

    // Wait for the component to fetch data
    await wrapper.vm.$nextTick()

    // Check if the component renders properly
    expect(wrapper.text()).toContain('Create a Team')
    // Check if the initial teams are rendered
    expect(wrapper.text()).toContain('Tiki-Taka')
    expect(wrapper.text()).toContain('Catenaccio')
  })
})
