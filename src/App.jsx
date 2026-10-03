import { useState } from 'react'
import RollHolder from './components/RollHolder'
import Wizard from './components/Wizard'
import Result from './components/Result'

const defaultAnswers = { people: 1, awayDaysPerWeek: 5, doesBusinessAway: false, rollSizeId: 'standard', packSize: 9 }

export default function App() {
  const [answers, setAnswers] = useState(defaultAnswers)
  const [done, setDone] = useState(false)

  return (
    <main className="app">
      <div className="intro-card">
        <header>
          <h1>Roll Call</h1>
          <p className="subhead">Work out how often your house really needs more toilet paper.</p>
        </header>

        <RollHolder />

        <p className="muted small">
          Based on UK usage averages.{' '}
          <a href="https://uk.nakedpaper.com/blogs/news/how-long-should-a-roll-of-toilet-paper-last" target="_blank" rel="noreferrer">
            See the source
          </a>.
        </p>
      </div>

      <div className="stack">
        {done ? (
          <Result answers={answers} onRestart={() => setDone(false)} />
        ) : (
          <Wizard answers={answers} onChange={setAnswers} onFinish={() => setDone(true)} />
        )}
      </div>
    </main>
  )
}
