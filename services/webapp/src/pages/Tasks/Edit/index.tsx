import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './Edit.module.css'

import { completeTask, getTask, updateTask } from '../../../hooks/api/tasks/tasks'
import { GetTask200Task } from '@/hooks/api/api.schemas'

import { Header } from '../../../components/Header'
import dayjs from 'dayjs'

function EditTask() {
  const { id } = useParams()

  const [task, setTask] = useState<GetTask200Task>()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)

  async function getTaskById(id: string) {
    const res = await getTask(id)

    setTask(res.data.task)
    setTitle(res.data.task.title)
    setDescription(res.data.task.description || '')
  }

  const formatDate = (data: string | Date | undefined) => dayjs(data).format('DD/MM/YYYY HH:mm:ss')

  async function HandleSubmit() {

    const taskData = {
      title,
      description
    }

    if (id) {
      await updateTask(id, taskData)
    }
  }

  async function handleCompleteTask(id: string) {
    await completeTask(id)
    window.location.reload()
  }

  useEffect(() => {
    if (id) {
      getTaskById(id)
    }
  }, [id])

  useEffect(() => {
    if (task) {
      const isTitleUnchanged = title === task.title
      const isDescriptionUnchanged = description === task.description
      const isTitleEmpty = title.trim() === ''

      setIsDisabled(isTitleEmpty || isTitleUnchanged && isDescriptionUnchanged)
    }
  }, [title, description, task])

  return (
    <>
      <Header />

      <main className={styles.container}>
        <div className={styles.container__content}>
          <section className={styles.section_title}>
            <h1>Altualizar tarefa</h1>
          </section>

          <section className={styles.section__form}>
            <form onSubmit={HandleSubmit}>
              <input type="text" name="title" id="" value={title} onChange={(e) => setTitle(e.target.value)} />
              <textarea name="" id="" value={description} onChange={(e) => setDescription(e.target.value)} />

              <div className={styles.task__info}>
                <div className={styles.task_info__content}>
                  <strong>Data de Criação: </strong>
                  <p>{formatDate(task?.created_at)}</p>
                </div>

                <div className={styles.task_info__content}>
                  <strong>Última alteração: </strong>
                  <p>{formatDate(task?.updated_at)}</p>
                </div>

                <div className={styles.task_info__content}>
                  <strong>Status da tarefa: </strong>
                  {task?.completed_at
                    ? <p>Completa</p>
                    : <p>Pendente</p>
                  }
                </div>
              </div>

              <button
                type="button"
                className={styles.button__complete}
                onClick={() => task && handleCompleteTask(task.id)}
              >
                Encerrar tarefa
              </button>

              <button
                type="submit"
                className={styles.button__submmit}
                disabled={isDisabled}
              >
                Salvar alterações
              </button>
            </form>
          </section>
        </div>
      </main>
    </>
  )
}

export default EditTask
