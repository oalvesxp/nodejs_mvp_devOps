import styles from './Header.module.css'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className={styles.header}>
      <section className={styles.header__content}>
        <nav className={styles.navbar}>
          <Link to='/'>
            Tarefas+
          </Link>
        </nav>
      </section>
    </header >
  )
}