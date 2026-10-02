import { useState } from 'react'
import QuestionSquare from './QuestionSquare'
import { ROLL_SIZES } from '../utils/estimate'

const PACK_SIZES = [4, 9, 12, 24]

export default function Wizard({ answers, onChange, onFinish }) {
  const [step, setStep] = useState(0)

  const questions = [
    {
      title: 'How many people live in the house?',
      valid: answers.people > 0,
      body: (
        <input
          type="number" min="1" max="12" value={answers.people}
          onChange={(e) => onChange({ ...answers, people: Number(e.target.value) })}
        />
      ),
    },
    {
      title: "How many days a week is everyone out of the house (work, school...)?",
      valid: true,
      body: (
        <input
          type="range" min="0" max="7" value={answers.awayDaysPerWeek}
          onChange={(e) => onChange({ ...answers, awayDaysPerWeek: Number(e.target.value) })}
        />
      ),
      extra: <p className="range-value">{answers.awayDaysPerWeek} day{answers.awayDaysPerWeek === 1 ? '' : 's'} a week</p>,
    },
    {
      title: 'Be honest: does anyone usually do their main business elsewhere on those days? (work loo, gym, in-laws...)',
      valid: true,
      body: (
        <div className="chips">
          <button type="button" className={`chip ${answers.doesBusinessAway ? 'chip-on' : ''}`} onClick={() => onChange({ ...answers, doesBusinessAway: true })}>Yes, often</button>
          <button type="button" className={`chip ${!answers.doesBusinessAway ? 'chip-on' : ''}`} onClick={() => onChange({ ...answers, doesBusinessAway: false })}>No, home only</button>
        </div>
      ),
    },
    {
      title: 'What roll size do you usually buy?',
      valid: true,
      body: (
        <div className="chips">
          {ROLL_SIZES.map((r) => (
            <button key={r.id} type="button" className={`chip ${answers.rollSizeId === r.id ? 'chip-on' : ''}`} onClick={() => onChange({ ...answers, rollSizeId: r.id })}>
              {r.label}
            </button>
          ))}
        </div>
      ),
    },
    {
      title: 'And a pack usually has how many rolls?',
      valid: true,
      body: (
        <div className="chips">
          {PACK_SIZES.map((n) => (
            <button key={n} type="button" className={`chip ${answers.packSize === n ? 'chip-on' : ''}`} onClick={() => onChange({ ...answers, packSize: n })}>
              {n}
            </button>
          ))}
        </div>
      ),
    },
  ]

  const q = questions[step]
  const isLast = step === questions.length - 1

  function next() {
    if (isLast) onFinish()
    else setStep(step + 1)
  }

  return (
    <QuestionSquare
      step={step + 1}
      total={questions.length}
      onNext={next}
      nextDisabled={!q.valid}
      nextLabel={isLast ? 'See my estimate ->' : 'Tear off ->'}
    >
      <h2>{q.title}</h2>
      {q.body}
      {q.extra}
    </QuestionSquare>
  )
}
