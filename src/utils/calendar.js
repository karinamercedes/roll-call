// Builds a recurring calendar reminder: "buy more toilet paper", repeating
// every N weeks, firing a day before the household is expected to run out.
// Same floating-time .ics approach as the travel-planner project.
const pad = (n) => String(n).padStart(2, '0')
const ymd = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`

export function buildReminderIcs({ daysPerPack, packSize, rollLabel }) {
  const today = new Date()
  const firstReminder = new Date(today)
  firstReminder.setDate(firstReminder.getDate() + Math.max(1, daysPerPack - 1)) // a day before it runs out

  const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const intervalWeeks = Math.max(1, Math.round(daysPerPack / 7))

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Roll Call//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:roll-call-${ymd(today)}@roll-call`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${ymd(firstReminder)}`,
    `RRULE:FREQ=WEEKLY;INTERVAL=${intervalWeeks}`,
    'SUMMARY:Buy more toilet paper',
    `DESCRIPTION:Time to restock -- a pack of ${packSize} (${rollLabel}) should be running low.`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.join('\r\n') + '\r\n'
}

export function download(filename, text, mime) {
  const blob = new Blob([text], { type: `${mime};charset=utf-8` })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
