# Relay Marketing Screenshot Pack

Generated from real Relay runs using Playwright Electron automation.

## Hero
- hero-01-operator-desk.png

## Execution
- execution-01-running.png
- execution-02-approval-pending.png
- execution-03-completed.png

## Governance
- governance-01-approval-gate.png
- governance-02-safety-scopes.png

## Context
- context-01-project-files.png
- context-02-local-files.png
- context-03-project-memory.png

## Visibility
- visibility-01-project-activity.png
- visibility-02-schedule.png

## Regenerate

Run this from workspace root:

npx wait-on http-get://localhost:5173/
npx playwright test -c playwright.electron.config.ts tests/e2e/marketing-pack-screenshots.spec.ts --workers=1
