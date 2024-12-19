import { useEffect, useState } from 'react'
import { fetchTasks } from '../http/generated/tasks/tasks'
import { type FetchTasks200TasksItem } from '../http/generated/api.schemas'
import '../App.css'

function Home() {
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
      {tasks.map(task => {
        return (
          <ul key={task.id}>
            <li>{task.id}</li>
            <li>{task.title}</li>
            <li>{task.description}</li>
            <li>{task.created_at}</li>
          </ul>
        )
      })}
    </>
  )
}

export default Home
