import { mockTasks } from '@/mock/tasks.mock'
import { describe, expect, it } from 'vitest'

describe('Function get all tasks test', () => {
  it('Should return all tasks', () => {
    const allTasks = mockTasks
    expect(allTasks).toBeDefined()
    expect(allTasks).toHaveLength(3)
  })
})
