# Angular 22 — OnPush, Zoneless & Signals

Tech & Learn interactive coding workshop. Seven independent debugging and refactoring challenges teach the modern Angular change-detection mental model through real application behavior.

## For participants

1. Open the StackBlitz link and fork the project.
2. Open any challenge from the dashboard.
3. Read the problem, goal, and constraints.
4. Edit the exact source file shown on the challenge page.
5. Let Angular recompile, return to the preview, and click **Check solution**.
6. Continue to any other challenge.

Every challenge is independent. The starter exercise implementations are intentionally broken, but they all compile. To fully reset code in StackBlitz, discard your edits or create a fresh fork; **Reset progress only** clears solved metadata, not source files.

## Running locally

```bash
npm install
npm start
```

Open `http://localhost:4200/`.

## Tests

```bash
npm test
npm run build
```

The default suite uses Angular CLI's Vitest runner and remains green on the intentionally broken starter branch. Reference acceptance coverage is kept separate from starter behavior.

## Workshop topics

- OnPush-by-default change detection and input references
- writable Signals with `signal()`
- synchronous derived state with `computed()`
- appropriate use of `effect()`
- zoneless view notifications
- `DestroyRef`, injection context, and `takeUntilDestroyed()`
- pragmatic RxJS/Signals interoperability and migration patterns

## StackBlitz

The project is designed to open or fork directly from GitHub in StackBlitz WebContainers. The `stackblitz.startCommand` package setting launches `npm start` automatically.

```text
https://stackblitz.com/github/OWNER/REPOSITORY
https://stackblitz.com/fork/github/OWNER/REPOSITORY
```

Replace `OWNER/REPOSITORY` after publishing; no environment variables, backend, database, authentication, or remote API is required.

## Workshop author notes

- Task metadata and participant copy live in `src/app/data/workshop-tasks.ts`.
- Runtime checkers in `src/app/shared/task-checker/` exercise the rendered demo instead of inspecting source strings.
- `TaskRunnerComponent` creates each exercise dynamically and catches initialization failures so Task 1 cannot destroy the shell.
- Solved state is stored locally by `ProgressService`.
- Add a task by creating its component, registering it in `src/app/tasks/task-components.ts`, adding metadata, and adding a checker case.
- Keep intentionally broken starters on `main`; apply the author reference notes in `solutions/` on a `solutions` branch for delivery.
- Add `?debugTasks=true` to a challenge URL to expose checker transition diagnostics after a failed check.

Angular 22 is zoneless by default. This project deliberately has no `zone.js` dependency and adds no legacy or redundant zoneless provider.
