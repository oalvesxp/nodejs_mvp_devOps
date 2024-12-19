import styles from './TaskList.module.css'

import { useEffect, useState } from 'react'
import { fetchTasks } from '../../hooks/api/tasks/tasks'
import { type FetchTasks200TasksItem } from '@/hooks/api/api.schemas'

import { FaRegEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export function TaskList() {
  const [tasks, setTasks] = useState<FetchTasks200TasksItem[]>([])

  useEffect(() => {
    fetchTasks().then(items => {
      setTasks(items.data.tasks)
    }).catch((error) => {
      console.error('Error fetching tasks:', error)
    })
  }, [])

  return (
    <ul>
      {tasks.map(task => (
        <li className={styles.task__item} key={task.id}>
          <div className={styles.task_item_content}>
            <div className={styles.task__status}>
              {task.completed_at && (
                <label className={styles.task__completed}>Concluída</label>
              )}
              <Link to={"/tasks/" + task.id} >
                <FaRegEdit size={22} color='#0089cc' />
              </Link>
            </div>
            <div className={styles.task__info}>
              <span className={styles.task__title}>{task.title}</span>
              <p className={styles.task__description}>{task.description}</p>
            </div>
          </div>
          <Link to={"/tasks/" + task.id + "/delete"} >
            <FaTrash size={22} color='#f44336' />
          </Link>
        </li>
      ))}
    </ul>
  )
}