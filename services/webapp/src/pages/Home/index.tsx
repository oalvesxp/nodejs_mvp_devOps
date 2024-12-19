import hero from '../../assets/hero.png'
import styles from './Home.module.css'

function Home() {
  return (
    <div className={styles.container}>
      <main>
        <div className={styles.container__logo}>
          <img className={styles.container__hero} src={hero} alt='Hero image' />
        </div>
        <h1 className={styles.container__title}>Sistema feito para você organizar <br /> seus estudos e tarefas</h1>
      </main>
    </div>
  )
}

export default Home
