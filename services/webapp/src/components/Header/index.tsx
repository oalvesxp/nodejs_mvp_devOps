import styles from './Header.module.css'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className={styles.header}>
      <section className={styles.header__content}>
        <nav className={styles.navbar}>
          <Link to='/'>
            <h1 className={styles.logo}>
              Tarefas<span>+</span>
            </h1>
          </Link>
        </nav>
        <Link to='/tasks'>
          <button className={styles.header__button}>
            Minha lista
          </button>
        </Link>
      </section>
    </header >
  )
}