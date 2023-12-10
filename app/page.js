import styles from './page.module.css'
import SaveableGraph from '../components/SaveableGraph';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Custom Graph Image Generator
      </h1>
      <div className={styles.description}>
        This is a simple graph generator that allows you to add data points and save the graph as a PNG.
      </div>
      <SaveableGraph />
    </main>
  )
}