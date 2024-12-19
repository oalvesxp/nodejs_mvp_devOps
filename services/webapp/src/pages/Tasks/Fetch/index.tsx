import styles from './Fetch.module.css'
import { Header } from '../../../components/Header'
import { TaskList } from '../../../components/TaskList'

function FetchTasks() {

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

          <TaskList />
        </section>
      </main>
    </>
  )
}

export default FetchTasks
