import { estimateUsage } from '../utils/estimate'
import { buildReminderIcs, download } from '../utils/calendar'

export default function Result({ answers, onRestart }) {
  const result = estimateUsage(answers)

  return (
    <div className="square result-square">
      <div className="perforation" aria-hidden="true" />
      <div className="square-inner">
        <p className="step-count">Your estimate</p>
        <h2>Buy a {result.packSize}-pack every {result.weeksPerPack} weeks</h2>
        <p className="muted">
          That's about {result.daysPerPack} days per pack of {result.rollLabel.toLowerCase()}, roughly {result.rollsPerMonth} rolls a month for your household.
        </p>

        <button
          type="button"
          className="primary tear-btn"
          onClick={() => download('toilet-paper-reminder.ics', buildReminderIcs(result), 'text/calendar')}
        >
          Download calendar reminder
        </button>
        <p className="reminder-note">
          <strong>One reminder, one day before</strong> -- it fires exactly one day before your household is expected to run out, so there's time to actually buy more. Add it to any calendar app.
        </p>

        <button type="button" className="link-reset" onClick={onRestart}>Start over</button>
      </div>
    </div>
  )
}
