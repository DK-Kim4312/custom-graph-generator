import styles from './page.module.css'
import SaveableGraph from '../components/SaveableGraph';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        
      </div>
      <SaveableGraph />
    </main>
  )
}