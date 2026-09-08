import { WorkshopTask } from '../models/task-definition';

export const WORKSHOP_TASKS: readonly WorkshopTask[] = [
  {
    id: 'task-01',
    number: 1,
    slug: '01-destroy-ref',
    title: 'The button does nothing',
    subtitle: "The visible problem isn't the real problem.",
    category: 'Debugging',
    concept: 'takeUntilDestroyed & injection context',
    difficulty: 'Intermediate',
    estimatedMinutes: '7 min',
    filePath: 'src/app/tasks/task-01-destroy-ref/task.component.ts',
    problem:
      "The Save button should save the form, but the page is broken and clicking it doesn't work. Find the actual cause.",
    goal: 'Clicking Save should display “Changes saved”, and the component should initialize successfully.',
    constraints: [
      'Keep the observable and subscription.',
      'Keep takeUntilDestroyed.',
      'Do not manually unsubscribe or introduce Subject<void>.',
      'Do not suppress the runtime error.',
    ],
    hints: [
      'Start with the browser console. Is the click handler actually the first thing that goes wrong?',
      'Some Angular APIs that call inject() implicitly require an injection context.',
    ],
    successExplanation:
      'takeUntilDestroyed() can obtain DestroyRef implicitly only inside an injection context. Passing an injected DestroyRef lets the subscription created in ngOnInit share the component lifetime safely.',
  },
  {
    id: 'task-02',
    number: 2,
    slug: '02-onpush',
    title: "Why didn't the child update?",
    subtitle: 'A mutation happened. A new input did not.',
    category: 'Change Detection',
    concept: 'OnPush & references',
    difficulty: 'Intermediate',
    estimatedMinutes: '7 min',
    filePath: 'src/app/tasks/task-02-onpush/task.component.ts',
    problem: 'The promote handler runs, but the child profile card keeps displaying the old role.',
    goal: 'After Promote to Admin, the child must display “Admin”.',
    constraints: [
      'Keep the parent and child components separate.',
      'Do not call detectChanges() or markForCheck().',
      'Do not switch to Eager/Default change detection.',
    ],
    hints: [
      'What did Angular receive as the child input before and after the click?',
      'Did the object change, or did the reference change?',
    ],
    successExplanation:
      'Angular now receives a new input reference, so the affected OnPush view can be checked. Mutation changes an object; immutable replacement changes the reference Angular receives.',
  },
  {
    id: 'task-03',
    number: 3,
    slug: '03-signals',
    title: 'Make it reactive',
    subtitle: 'State changes after the event, but the view stays behind.',
    category: 'Signals',
    concept: 'signal() & writable state',
    difficulty: 'Beginner',
    estimatedMinutes: '6 min',
    filePath: 'src/app/tasks/task-03-signals/task.component.ts',
    problem:
      'Incoming notifications update the plain field asynchronously, but the visible counter is stale in this zoneless app.',
    goal: 'The counter must render every increment and reset across repeated transitions.',
    constraints: [
      'Keep the asynchronous notification simulation.',
      'Use Angular state primitives rather than manual change detection.',
      'Keep increment and reset behavior.',
    ],
    hints: [
      'Which values in this component represent writable reactive state?',
      'A signal is read by calling it and changed with set() or update().',
    ],
    successExplanation:
      'Writable signals hold state and notify Angular when template-relevant values change. set() replaces a value; update() derives the next value from the current one.',
  },
  {
    id: 'task-04',
    number: 4,
    slug: '04-computed',
    title: 'Stop synchronizing this manually',
    subtitle: 'One source changed; its copied counter did not.',
    category: 'Derived State',
    concept: 'computed()',
    difficulty: 'Intermediate',
    estimatedMinutes: '8 min',
    filePath: 'src/app/tasks/task-04-computed/task.component.ts',
    problem:
      'The task list changes correctly, but the completed total becomes stale after some operations.',
    goal: 'The completed count must always agree with the task list.',
    constraints: [
      'Do not add a recalculate call to every operation.',
      'Do not subscribe solely to synchronize the count.',
      'Keep the task list as the source of truth.',
    ],
    hints: [
      'Is completedCount really independent state?',
      'If a value can always be calculated from another signal, should it be writable?',
    ],
    successExplanation:
      'computed() models synchronous derived state inside the reactive graph. The count now has one source of truth and cannot drift away from the task list.',
  },
  {
    id: 'task-05',
    number: 5,
    slug: '05-effect',
    title: "This effect shouldn't exist",
    subtitle: 'Derived state belongs in the reactive graph.',
    category: 'Reactive Architecture',
    concept: 'effect() vs computed()',
    difficulty: 'Intermediate',
    estimatedMinutes: '9 min',
    filePath: 'src/app/tasks/task-05-effect/task.component.ts',
    problem:
      'Changing the filter leaves the rendered task list stale until unrelated source data changes.',
    goal: 'Filtering must react correctly to both source-list and filter changes.',
    constraints: [
      'Do not synchronize one signal into another with subscribe().',
      'Avoid writing derived state from effect().',
      'Keep all filter options working.',
    ],
    hints: [
      'Is the effect performing an external side effect, or calculating another value?',
      'Derived state belongs in the reactive graph.',
    ],
    successExplanation:
      'Source signals should feed computed values, which the template reads directly. Effects are best reserved for real interactions with non-reactive or external systems.',
  },
  {
    id: 'task-06',
    number: 6,
    slug: '06-zoneless',
    title: "JavaScript changed. Angular didn't know.",
    subtitle: 'The callback ran; the notification was missing.',
    category: 'Change Detection',
    concept: 'Zoneless notifications',
    difficulty: 'Intermediate',
    estimatedMinutes: '8 min',
    filePath: 'src/app/tasks/task-06-zoneless/task.component.ts',
    problem:
      'An external-style browser callback finishes, but the visible sync status remains stuck.',
    goal: 'After starting sync, the UI must naturally render “Ready”.',
    constraints: [
      'Do not add ZoneJS.',
      'Do not call detectChanges().',
      'Keep the asynchronous callback mechanism.',
    ],
    hints: [
      'The callback runs. Verify that with the console.',
      'How does Angular know that view-relevant state changed?',
    ],
    successExplanation:
      'Zoneless Angular needs an appropriate notification that view-relevant state changed. Updating a template-read signal provides one; inputs, Angular listeners, AsyncPipe, and marking APIs are other notification paths.',
  },
  {
    id: 'task-07',
    number: 7,
    slug: '07-modernize',
    title: 'Modernize this component',
    subtitle: 'Put the pieces together.',
    category: 'Migration',
    concept: 'Signals + RxJS + derived state',
    difficulty: 'Advanced',
    estimatedMinutes: '12–15 min',
    filePath: 'src/app/tasks/task-07-modernize/task.component.ts',
    problem:
      'This legacy component mixes subscriptions, copied state, mutation, manual cleanup, and forced detection. Its active-user view becomes stale.',
    goal: 'Modernize the state flow so loading, selection, filters, and derived lists remain correct without forced detection.',
    constraints: [
      'Keep the service Observable as an appropriate async boundary.',
      'Remove unnecessary detectChanges().',
      'Avoid duplicated derived collections and manual synchronization.',
      'Keep selection and status changes working.',
    ],
    hints: [
      'Separate async stream handling, writable UI state, and synchronous derivation.',
      'toSignal() can form a clean RxJS boundary; computed() can express filtered views.',
    ],
    successExplanation:
      'Signals are excellent for state and synchronous derivation. RxJS remains excellent for asynchronous streams, cancellation, composition, debouncing, websockets, and other event-over-time workflows.',
  },
];

export function findTask(slug: string | null): WorkshopTask | undefined {
  return WORKSHOP_TASKS.find((task) => task.slug === slug);
}
