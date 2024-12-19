import hero from '../../assets/hero.png'
import styles from './Home.module.css'

function Home() {
  return (
    <div className={styles.container}>
      <main>
        <div className={styles.container__logo}>
          <img className={styles.hero} src={hero} alt='Hero image' />
        </div>
        <h1 className={styles.container__title}>
          Sistema feito para você organizar <br />
          seus estudos e tarefas
        </h1>

        <div className={styles.container__content}>
          <section className={styles.box}>
            <span>+ 12 posts</span>
          </section>

          <section className={styles.box}>
            <span>+ 90 comentários</span>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Home
