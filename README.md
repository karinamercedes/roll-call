# Roll Call

A deliberately silly, genuinely working wizard that estimates how often your household needs to buy toilet paper -- answered one "square" at a time, hanging off a roll, like the real thing.

**Live demo:** _add your Vercel link here once deployed_
**Repo:** _add your GitHub link here_

## Why this exists

Subscription paper brands (Naked Paper, Who Gives A Crap, etc.) ask a short quiz to estimate your household's usage and set a delivery schedule. This is the same idea as a small, self-contained project: a short set of questions, a plain-JavaScript estimate based on published averages, and a calendar reminder you can actually use -- wrapped in a UI themed around the thing it's estimating.

## Features

- Five quick questions, each its own "square" of toilet paper, torn off one at a time
- Estimate based on UK average usage (~60-69 sheets/person/day), adjusted down for time spent doing "main business" elsewhere
- Choose your usual roll size and pack size; get a plain-English answer ("buy a 9-pack every 4 weeks")
- Download a **recurring** calendar reminder (.ics), timed a day before the household is expected to run out
- No sign-up, no backend, nothing saved beyond the session

## Tech stack

React + Vite. No APIs, no backend, no paid services -- just a formula and a calendar file generator.

## Run it locally

```bash
npm install
npm run dev
```
Open the address it prints (usually http://localhost:5173).

## Project structure

```
src/
  components/   RollHolder, QuestionSquare, Wizard, Result
  utils/        estimate.js (the usage formula), calendar.js (.ics export)
  App.jsx
```

## How the estimate works

`utils/estimate.js` starts from a UK average of roughly 64 sheets per person per day (the midpoint of published estimates -- see [Naked Paper's write-up](https://uk.nakedpaper.com/blogs/news/how-long-should-a-roll-of-toilet-paper-last), which also reports their own subscribers average 6 standard rolls/person/month, close to what this formula produces for a household that's rarely away). If the household does its "main business" elsewhere on some days of the week, that fraction of the week has one visit's worth of sheets subtracted per person. The result is divided into the pack size and roll size you choose, giving days-per-pack and a suggested buying interval.

This is a rough, fun estimate, not a precise calculation -- it's meant to give you a sensible starting point, the same way the subscription-paper quizzes do.

## How the calendar reminder works

`utils/calendar.js` builds a standard `.ics` file with a single recurring event (`RRULE:FREQ=WEEKLY;INTERVAL=n`), timed to fire a day before a pack is expected to run out, repeating at that same interval indefinitely. Opens in Google Calendar, Apple Calendar, Outlook, or any calendar app that accepts .ics imports.

## Roadmap

- [x] Five-question wizard, themed as a toilet roll
- [x] Usage estimate with away-from-home adjustment
- [x] Recurring calendar reminder export
- [ ] Let the user tweak the estimate after seeing it (e.g. "actually we go through more")
- [ ] Remember the last answers (currently resets each visit, deliberately kept simple)
