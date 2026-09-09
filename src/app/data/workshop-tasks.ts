import { WorkshopTask } from '../models/task-definition';

export const WORKSHOP_TASKS: readonly WorkshopTask[] = [
  {
    id: 'task-01',
    number: 1,
    slug: '01-destroy-ref',
    title: 'Der Button macht nichts',
    subtitle: 'Das sichtbare Problem ist nicht die eigentliche Ursache.',
    category: 'Debugging',
    concept: 'takeUntilDestroyed & Injection Context',
    difficulty: 'Mittel',
    estimatedMinutes: '8–12 Min.',
    filePath: 'src/app/tasks/task-01-destroy-ref/task.component.ts',
    problem:
      'Der Speichern-Button soll das Formular sichern. Die Seite bricht jedoch schon vorher ab. Finde die eigentliche Ursache.',
    goal: 'Die Komponente startet fehlerfrei und zeigt nach dem Speichern „Änderungen gespeichert“ an.',
    constraints: [
      'Observable und Subscription bleiben erhalten.',
      'Verwende weiterhin takeUntilDestroyed().',
      'Kein manuelles Unsubscribe und kein Subject<void>.',
      'Der Laufzeitfehler darf nicht unterdrückt werden.',
    ],
    hints: [
      'Beginne in der Browser-Konsole. Ist der Click-Handler wirklich die erste Stelle, die scheitert?',
      'Einige Angular-APIs verwenden intern inject() und benötigen deshalb einen Injection Context.',
    ],
    successExplanation:
      'takeUntilDestroyed() kann DestroyRef nur innerhalb eines Injection Context automatisch beziehen. Ein injiziertes DestroyRef bindet auch die in ngOnInit erstellte Subscription sicher an den Lebenszyklus der Komponente.',
  },
  {
    id: 'task-02',
    number: 2,
    slug: '02-onpush',
    title: 'Warum aktualisiert sich das Child nicht?',
    subtitle: 'Eine Mutation fand statt. Eine neue Input-Referenz nicht.',
    category: 'Change Detection',
    concept: 'OnPush · Input- und Output-Signale',
    difficulty: 'Einfach',
    estimatedMinutes: '5–7 Min.',
    filePath: 'src/app/tasks/task-02-onpush/task.component.ts',
    problem:
      'Nach der Migration des Childs von Eager auf OnPush läuft der Handler, die Profilkarte zeigt aber weiterhin die alte Rolle. Das Child verwendet bereits input() und output().',
    goal: 'Nach „Zum Administrator machen“ zeigt das Child „Administrator“ an; sein Reset-Output funktioniert weiterhin.',
    constraints: [
      'Parent und Child bleiben getrennte Komponenten.',
      'Signal-Input und Signal-Output des Childs bleiben erhalten.',
      'Kein detectChanges() und kein markForCheck().',
      'Nicht zu Eager zurückwechseln.',
    ],
    hints: [
      'Welche Referenz erhält Angular vor und nach dem Klick als Child-Input?',
      'Ein Event im Child und eine neue Input-Referenz benachrichtigen OnPush auf unterschiedliche Weise.',
    ],
    successExplanation:
      'Angular erhält eine neue Input-Referenz und prüft dadurch das betroffene OnPush-Child. Die immutable Ersetzung ergänzt die signalbasierten Inputs und Outputs, ohne das Objekt in-place zu verändern.',
  },
  {
    id: 'task-03',
    number: 3,
    slug: '03-signals',
    title: 'Zustand reaktiv machen',
    subtitle: 'Der Async-Callback läuft, die zoneless View bleibt zurück.',
    category: 'Signals',
    concept: 'signal() · schreibbarer Zustand · Zoneless',
    difficulty: 'Einfach',
    estimatedMinutes: '6–8 Min.',
    filePath: 'src/app/tasks/task-03-signals/task.component.ts',
    problem:
      'Eingehende Benachrichtigungen aktualisieren asynchron ein normales Feld. In der zoneless App bleibt der sichtbare Zähler veraltet.',
    goal: 'Der Zähler zeigt jedes Inkrement und jeden Reset zuverlässig an.',
    constraints: [
      'Der Browser-Timer als Async-Grenze bleibt erhalten.',
      'ZoneJS darf nicht hinzugefügt werden.',
      'Nutze Angular-Zustandsprimitive statt manueller Change Detection.',
      'Inkrement und Reset müssen weiterhin funktionieren.',
    ],
    hints: [
      'Der Click-Handler startet nur den Timer. Wer benachrichtigt Angular nach dem späteren Callback?',
      'Ein Signal wird mit () gelesen und mit set() oder update() geändert.',
    ],
    successExplanation:
      'Das schreibbare Signal hält den Zustand und benachrichtigt Angular auch aus dem späteren Browser-Callback. set() ersetzt einen Wert, update() leitet den nächsten Wert vom aktuellen ab; ZoneJS und manuelle Change Detection bleiben unnötig.',
  },
  {
    id: 'task-04',
    number: 4,
    slug: '04-computed',
    title: 'Ableiten statt synchronisieren',
    subtitle: 'Tiefe Mutation und kopierter Zustand driften auseinander.',
    category: 'Signals',
    concept: 'computed() · immutable Listen-Updates',
    difficulty: 'Mittel',
    estimatedMinutes: '10–15 Min.',
    filePath: 'src/app/tasks/task-04-computed/task.component.ts',
    problem:
      'Die Todo-Liste wird mit push() und Objektmutation verändert. Weil Signals standardmäßig mit Object.is vergleichen, bleibt die Ableitung veraltet.',
    goal: 'Liste und Erledigt-Zähler bleiben nach Toggle, Hinzufügen und Reset immer konsistent.',
    constraints: [
      'Erzeuge beim Update eine neue Liste und bei Änderungen ein neues Todo-Objekt.',
      'Der Zähler wird mit computed() abgeleitet.',
      'Keine Recalculate-Aufrufe und keine Synchronisierungs-Subscription.',
      'Die Todo-Liste bleibt die einzige Source of Truth.',
    ],
    hints: [
      'Meldet tasks().push(...) dem Signal überhaupt eine neue Referenz?',
      'Wenn ein Wert vollständig aus einem Signal berechnet werden kann, sollte er dann schreibbar sein?',
    ],
    successExplanation:
      'update() liefert neue Listen- und Objekt-Referenzen; computed() modelliert den synchron abgeleiteten Zustand lazy und memoized. So gibt es nur eine Source of Truth.',
  },
  {
    id: 'task-05',
    number: 5,
    slug: '05-effect',
    title: 'Dieser effect gehört hier nicht hin',
    subtitle: 'Abgeleiteter Zustand gehört in den reaktiven Graphen.',
    category: 'Reaktive Architektur',
    concept: 'effect() · async Tracking · computed()',
    difficulty: 'Anspruchsvoll',
    estimatedMinutes: '10–15 Min.',
    filePath: 'src/app/tasks/task-05-effect/task.component.ts',
    problem:
      'Der effect() im Constructor liest und setzt dasselbe Filter-Signal nach einem await. Filterwechsel bleiben deshalb ungetrackt; außerdem wird abgeleiteter Zustand manuell synchronisiert.',
    goal: 'Die Liste reagiert korrekt auf Änderungen der Source-Liste und des Filters – ohne Synchronisierungs-effect.',
    constraints: [
      'Dasselbe Signal darf nicht innerhalb eines effect() gelesen und gesetzt werden.',
      'Kein Schreiben abgeleiteten Zustands aus effect() oder subscribe().',
      'Alle Filteroptionen bleiben funktionsfähig.',
    ],
    hints: [
      'Signal-Lesezugriffe nach einer Async-Grenze werden vom effect() nicht als Dependency erfasst.',
      'Ist das ein externer Side Effect – oder lediglich eine synchrone Ableitung?',
    ],
    successExplanation:
      'computed() liest beide Source-Signals synchron und liefert den abgeleiteten Wert direkt. effect() bleibt echten Side Effects vorbehalten; Signal-Lesezugriffe nach await werden nicht getrackt.',
  },
  {
    id: 'task-06',
    number: 6,
    slug: '06-modernize',
    title: 'Diese Komponente modernisieren',
    subtitle: 'Jetzt greifen alle Bausteine ineinander.',
    category: 'Migration',
    concept: 'Eager → OnPush · Signals + RxJS',
    difficulty: 'Anspruchsvoll',
    estimatedMinutes: '20–30 Min.',
    filePath: 'src/app/tasks/task-06-modernize/task.component.ts',
    problem:
      'Die durch ng update zunächst auf Eager belassene Komponente mischt Subscriptions, kopierten Zustand, Mutation, manuelles Cleanup und erzwungene Change Detection.',
    goal: 'Migriere schrittweise auf OnPush: Laden, Auswahl, Suche und abgeleitete Listen bleiben ohne erzwungene Change Detection korrekt.',
    constraints: [
      'Das Service-Observable bleibt die Async-Grenze.',
      'Wechsle gezielt von Eager zu OnPush.',
      'Entferne unnötiges detectChanges() und manuelles Subscription-Cleanup.',
      'Keine duplizierten Collections oder direkte Objektmutation.',
      'ZoneJS bleibt entfernt; teste das Verhalten im DOM.',
    ],
    hints: [
      'Trenne Async-Stream, schreibbaren UI-Zustand und synchrone Ableitungen.',
      'toSignal() oder takeUntilDestroyed() bilden eine saubere RxJS-Grenze; computed() beschreibt gefilterte Views.',
      'Prüfe bei echten Migrationen außerdem direkte Input-Zuweisungen, NgZone.onStable und Tests, die fehlende Benachrichtigungen mit detectChanges() verdecken.',
    ],
    successExplanation:
      'OnPush begrenzt den zu prüfenden Teilbaum, Signals melden relevante Änderungen und computed() hält Ableitungen konsistent. RxJS bleibt stark für Streams, Cancellation, Komposition, Debouncing und WebSockets.',
  },
];

export function findTask(slug: string | null): WorkshopTask | undefined {
  return WORKSHOP_TASKS.find((task) => task.slug === slug);
}
