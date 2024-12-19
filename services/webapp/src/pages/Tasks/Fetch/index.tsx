import { ChangeEvent } from 'react'
import styles from './Fetch.module.css'

import { createTask } from '../../../hooks/api/tasks/tasks'

import { Header } from '../../../components/Header'
import { TaskList } from '../../../components/TaskList'
import { useState } from 'react'

function Tasks() {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  const handleSubmit = async () => {
    try {
      await createTask(formData)
    } catch (err) {
      console.error("Erro ao salvar a tarefa: ", err)
    }
  }

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
              <button className={styles.container__form__button} type="submit">
                Salvar
              </button>
            </form>

          </section>
        </div>

        <section className={styles.container__content}>
          <h2 className={styles.container__content__subtitle}>Minhas tarefas</h2>

          <TaskList />
        </section>
      </main>
    </>
  )
}

export default Tasks
