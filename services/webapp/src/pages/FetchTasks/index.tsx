import { useEffect, useState } from 'react'
import { fetchTasks } from '../../hooks/api/tasks/tasks'
import { type FetchTasks200TasksItem } from '@/hooks/api/api.schemas'
import dayjs from 'dayjs'

function FetchTasks() {
  const [tasks, setTasks] = useState<FetchTasks200TasksItem[]>([])

  useEffect(() => {
    fetchTasks().then(items => {
      setTasks(items.data.tasks)
    }).catch((error) => {
      console.error('Error fetching tasks:', error)
    })
  }, [])

  return (
    <>
      <h1>Home</h1>
      <div>
        {tasks.map(task => {
          return (
            <div key={task.id}>
              <div>
                <p>{task.id}</p>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>{dayjs(task.created_at).format('DD/MM/YYYY HH:mm:ss')}</p>
                <p>{task.completed_at ? 'Completa' : 'Pendente'}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default FetchTasks
