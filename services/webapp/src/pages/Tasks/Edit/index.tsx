import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import styles from './Edit.module.css'

import { completeTask, getTask } from '../../../hooks/api/tasks/tasks'
import { GetTask200Task } from '@/hooks/api/api.schemas'
import { Header } from '../../../components/Header'
import dayjs from 'dayjs'

function EditTask() {
  const { id } = useParams()
  const [task, setTask] = useState<GetTask200Task>()
  const [formTitle, setFormTitle] = useState('')
  const [formDescription, setFormDescription] = useState('')

  async function getTaskById(id: string) {
    try {
      const res = await getTask(id);
      setTask(res.data.task);
    } catch (err) {
      console.error('Error fetching task:', err)
    }
  }

  function formatDate(data: string | Date) {
    return dayjs(data).format('DD/MM/YYYY HH:mm:ss');
  }

  async function handleCompleteTask(id: string) {
    try {
      await completeTask(id)
      getTaskById(id)
    } catch (err) {
      console.error("Erro ao salvar a tarefa: ", err)
    }
  }

  useEffect(() => {
    if (id) {
      getTaskById(id);
    }
  }, [id]);

  useEffect(() => {
    if (task) {
      setFormTitle(task.title || '')
      setFormDescription(task.description || '')
    }
  }, [task]);

  const isDisabled =
    formTitle === task?.title &&
    formDescription === task?.description ||
    formTitle.trim() === ''

  return (
    <>
      <Header />

      <main className={styles.container}>
        <div className={styles.container__head}>
          <section className={styles.container__form}>
            <h1 className={styles.container__form__title}>Atualizar tarefa</h1>

            <form>
              <input
                type="text"
                name="title"
                placeholder="Título da tarefa"
                className={styles.container__form__input}
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />

              <textarea
                name="description"
                placeholder="Descrição..."
                className={styles.container__form__textarea}
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
              />

              <input
                type="text"
                name="created_at"
                className={styles.container__form__input}
                value={task?.created_at && 'Criada em ' + formatDate(task.created_at)}
                disabled
              />

              <input
                type="text"
                name="updated_at"
                className={styles.container__form__input}
                value={task?.updated_at && 'Última atualização ' + formatDate(task.updated_at)}
                disabled
              />

              <input
                type="text"
                name="completed_ad"
                className={styles.container__form__input}
                value={task?.completed_at ? 'Concluída em ' + formatDate(task.completed_at) : 'Status: Pendente'}
                disabled
              />

              <button
                className={`${styles.container__form__completeGreen} ${task?.completed_at ? styles.container__form__completeRed : ''}`}
                type="button"
                onClick={() => {
                  if (task?.id) {
                    handleCompleteTask(task.id);
                  } else {
                    console.error('Invalid task ID');
                  }
                }}
              >
                {task?.completed_at ? 'Marcar tarefa como não concluída' : 'Marcar tarefa como concluída'}
              </button>

              <button
                className={styles.container__form__button}
                type="submit"
                disabled={isDisabled}
              >
                Salvar
              </button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}

export default EditTask
