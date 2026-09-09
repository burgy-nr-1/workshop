# Angular 22 — OnPush, Zoneless & Signals

Interaktiver Tech-&-Learn-Coding-Workshop zu modernen Angular-Architekturen. Sechs unabhängige Debugging- und Refactoring-Aufgaben vermitteln das Reaktivitätsmodell von Angular 22 anhand von beobachtbarem Anwendungsverhalten.

## Für Teilnehmende

1. StackBlitz-Link öffnen und das Projekt forken.
2. Eine beliebige Aufgabe in der Übersicht öffnen.
3. Problem, Ziel und Rahmenbedingungen lesen.
4. Die auf der Aufgabenseite angegebene Datei bearbeiten.
5. Angular neu kompilieren lassen, zur Vorschau wechseln und **Lösung prüfen** wählen.
6. Mit einer beliebigen weiteren Aufgabe fortfahren.

Jede Aufgabe ist unabhängig. Die Starter-Implementierungen sind absichtlich fehlerhaft, kompilieren aber. Für einen vollständigen Code-Reset in StackBlitz Änderungen verwerfen oder einen neuen Fork anlegen. **Nur Fortschritt zurücksetzen** löscht ausschließlich den gespeicherten Lösungsstand, keine Source-Dateien.

## Lokal starten

```bash
npm install
npm start
```

Danach `http://localhost:4200/` öffnen.

## Tests und Build

```bash
npm test
npm run test:solutions
npm run build
```

Die Standard-Suite verwendet den Vitest-Runner der Angular CLI und bleibt auch mit den absichtlich fehlerhaften Starter-Aufgaben grün. `test:solutions` überlagert die Starter in einem temporären Workspace mit allen Referenzlösungen, baut die Anwendung und führt jeden Runtime-Check aus.

## Workshop-Inhalte

- Angular-22-Migration: von durch `ng update` erhaltenem Eager-Verhalten schrittweise zu OnPush
- OnPush-Benachrichtigungen durch neue Input-Referenzen, Events und Signals
- signalbasierte Inputs und Outputs
- schreibbarer Zustand mit `signal()`, `set()` und `update()`
- immutable Listen- und Objekt-Updates statt `push()` und in-place Mutation
- synchroner, lazy und memoized Derived State mit `computed()`
- `effect()` nur für Side Effects; keine Read/Write-Schleife auf demselben Signal
- nur synchron erfasste Dependencies in `effect()` — Lesezugriffe nach `await` werden nicht getrackt
- zoneless Updates durch Signals; weitere Pfade sind Angular-Listener, AsyncPipe, `setInput()` und `markForCheck()`
- `DestroyRef`, Injection Context und `takeUntilDestroyed()`
- pragmatische RxJS/Signals-Interop bei schrittweisen Migrationen
- DOM-basierte Tests, die fehlende Benachrichtigungen sichtbar machen

Angular 22 ist zoneless by default. Dieses Projekt enthält deshalb weder eine `zone.js`-Dependency noch einen Zone-Provider oder ZoneJS-Polyfill.

## Browser-Konsole

Eine vollständige DevTools-Konsole lässt sich nicht sinnvoll direkt in eine normale Webseite einbetten. Die Seite kann wegen der Browser-Sicherheitsgrenzen weder die DevTools-Oberfläche noch deren vollständige Historie und Debugger-Funktionen übernehmen. Ein eigener Log-Bereich könnte lediglich gezielt weitergeleitete App-Meldungen anzeigen und wäre kein Ersatz für die Browser-Konsole. Aufgabe 1 verweist deshalb bewusst auf die echten DevTools; ein vereinfachtes Konsolen-Imitat ist nicht eingebaut.

Für zusätzliche Details der Runtime-Checks kann an eine Aufgaben-URL `?debugTasks=true` angehängt werden. Diese Diagnostik zeigt nur die beobachteten Zustandsübergänge und fängt nicht global `console.*` ab.

## Projektstruktur

Die Angular-Komponenten folgen den Konventionen der Stationär-Projekte: getrennte `.ts`-, `.html`- und `.scss`-Dateien, SCSS als Workspace-Standard, `app-`-Selektoren, explizite Sichtbarkeiten und Typen an öffentlichen APIs sowie `ChangeDetectionStrategy.OnPush` für modernisierte Komponenten. Die Übungs-Starter weichen nur dort absichtlich ab, wo genau diese Abweichung Teil der Aufgabe ist.

## StackBlitz

Das Projekt kann direkt aus GitHub in einem StackBlitz WebContainer geöffnet oder geforkt werden. `stackblitz.startCommand` startet automatisch `npm start`.

```text
https://stackblitz.com/github/OWNER/REPOSITORY
https://stackblitz.com/fork/github/OWNER/REPOSITORY
```

Nach der Veröffentlichung `OWNER/REPOSITORY` ersetzen. Umgebungsvariablen, Backend, Datenbank, Authentifizierung oder Remote-API sind nicht erforderlich.

## Hinweise für Workshop-Autorinnen und -Autoren

- Aufgabenmetadaten und Texte liegen in `src/app/data/workshop-tasks.ts`.
- Runtime-Checks unter `src/app/shared/task-checker/` prüfen das gerenderte Verhalten statt Source-Strings.
- `TaskRunnerComponent` erstellt jede Übung dynamisch und fängt Initialisierungsfehler ab, damit Aufgabe 1 nicht die Workshop-Shell zerstört.
- `ProgressService` speichert gelöste Aufgaben lokal.
- Neue Aufgaben benötigen eine Komponente, einen Eintrag in `src/app/tasks/task-components.ts`, Metadaten und einen Checker-Fall.
- Die absichtlich fehlerhaften Starter bleiben auf `main`; die Dateien unter `solutions/` dokumentieren die Referenzlösungen für einen separaten `solutions`-Branch.
