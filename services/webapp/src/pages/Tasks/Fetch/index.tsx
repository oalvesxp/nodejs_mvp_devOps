import { useEffect, useState } from 'react'
import styles from './Fetch.module.css'

import { fetchTasks } from '../../../hooks/api/tasks/tasks'
import { type FetchTasks200TasksItem } from '@/hooks/api/api.schemas'

import { Header } from '../../../components/Header'
import { FaRegEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

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
      <Header />

      <main className={styles.container}>
        <div className={styles.container__head}>
          <section className={styles.container__form}>
            <h1 className={styles.container__form__title}>Qual sua tarefa?</h1>
            <form>
              <input
                type="text"
                placeholder="Título da tarefa"
                className={styles.container__form__input}
              />
              <textarea
                placeholder="Descrição..."
                className={styles.container__form__textarea}
              ></textarea>
              <button className={styles.container__form__button} type="submit">
                Salvar
              </button>
            </form>
          </section>
        </div>

        <section className={styles.container__content}>
          <h2 className={styles.container__content__subtitle}>Minhas tarefas</h2>
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
        </section>
      </main>
    </>
  )
}

export default FetchTasks
