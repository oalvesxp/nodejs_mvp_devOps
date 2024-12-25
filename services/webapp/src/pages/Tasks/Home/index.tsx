import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import styles from './Fetch.module.css'

import { createTask, fetchTasks } from '../../../hooks/api/tasks/tasks'
import { FetchTasks200TasksItem } from '@/hooks/api/api.schemas'
import { Header } from '../../../components/Header'

import { FaRegEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Tasks() {
  const [tasks, setTasks] = useState<FetchTasks200TasksItem[]>([])
  const [isChanged, setIsChanged] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  })

  async function fetchManyTasks() {
    const res = await fetchTasks()
    setTasks(res.data.tasks)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await createTask(formData)
      setFormData({
        title: '',
        description: ''
      })
      setIsChanged(!isChanged)
    } catch (err) {
      console.error("Erro ao salvar a tarefa: ", err)
    }
  }

  async function handleDeleteTask(id: string) {
    await fetch(`${process.env.REACT_APP_API_URL}:3000/tasks/` + id, {
      method: 'DELETE'
    })

    setIsChanged(!isChanged)
  }

  useEffect(() => {
    fetchManyTasks()
  }, [])

  useEffect(() => {
    if (isChanged) {
      fetchManyTasks()
      setIsChanged(!isChanged)
    }
  }, [isChanged])

  return (
    <>
      <Header />

      <main className={styles.container}>
        <div className={styles.container__head}>
          <section className={styles.container__form}>
            <h1 className={styles.container__form__title}>Qual sua tarefa?</h1>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Título da tarefa"
                className={styles.container__form__input}
                value={formData.title}
                onChange={handleInputChange}
              />
              <textarea
                name="description"
                placeholder="Descrição..."
                className={styles.container__form__textarea}
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
              <button
                className={styles.container__form__button}
                type="submit"
                disabled={!formData.title.trim()}
              >
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
                    <Link to={'/tasks/' + task.id} >
                      <FaRegEdit className={styles.task__edit} size={22} color='#0089cc' />
                    </Link>
                  </div>
                  <div className={styles.task__info}>
                    <span className={styles.task__title}>{task.title}</span>
                    <p className={styles.task__description}>{task.description}</p>
                  </div>
                </div>

                <button className={styles.task__delete} onClick={() => handleDeleteTask(task.id)}>
                  <FaTrash size={22} color='#f44336' />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}

export default Tasks
