// The estimate: plain JavaScript, no React. Based on published UK averages
// (roughly 60-69 sheets per person per day -- see README for the source),
// adjusted down for time spent going "elsewhere" (work, gym, in-laws...).
//
// This is deliberately a rough estimate, not a medical or engineering
// calculation -- the point is a sensible starting number you can tweak once
// you see how fast your real roll disappears.

const UK_AVERAGE_SHEETS_PER_DAY = 64 // midpoint of the ~60-69 range
const SHEETS_SAVED_PER_AWAY_VISIT = 10 // roughly one "proper" bathroom visit's worth

export const ROLL_SIZES = [
  { id: 'standard', label: 'Standard (~200 sheets)', sheets: 200 },
  { id: 'big', label: 'Big / quilted (~250 sheets)', sheets: 250 },
  { id: 'jumbo', label: 'Jumbo / eco (~320 sheets)', sheets: 320 },
]

const round = (n) => Math.round(n)

export function estimateUsage({ people, awayDaysPerWeek, doesBusinessAway, packSize, rollSizeId }) {
  const rollSize = ROLL_SIZES.find((r) => r.id === rollSizeId) ?? ROLL_SIZES[0]

  // Baseline household usage, no adjustment.
  const baselineSheetsPerDay = people * UK_AVERAGE_SHEETS_PER_DAY

  // If the household does its "main business" away from home on some days,
  // shave off one visit's worth of sheets per person for the fraction of
  // the week that applies.
  const awayFraction = doesBusinessAway ? Math.min(7, awayDaysPerWeek) / 7 : 0
  const dailyReduction = people * SHEETS_SAVED_PER_AWAY_VISIT * awayFraction

  const sheetsPerDay = Math.max(10, baselineSheetsPerDay - dailyReduction) // never below ~1 visit's worth
  const sheetsPerPack = packSize * rollSize.sheets
  const daysPerPack = sheetsPerPack / sheetsPerDay

  return {
    sheetsPerDay: round(sheetsPerDay),
    rollsPerMonth: Math.ceil((sheetsPerDay * 30) / rollSize.sheets),
    daysPerPack: round(daysPerPack),
    weeksPerPack: Math.round((daysPerPack / 7) * 10) / 10,
    packSize,
    rollLabel: rollSize.label,
  }
}
