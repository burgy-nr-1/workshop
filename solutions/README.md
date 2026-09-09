# Referenzlösungen für Workshop-Autorinnen und -Autoren

Diese Dateien liegen außerhalb des kompilierten Angular-Source-Trees und sind nicht in der Oberfläche verlinkt. Auf einem separaten `solutions`-Branch die Dateien jeder Aufgabe über die gleichnamigen Dateien unter `src/app/tasks/` kopieren und anschließend `npm test` sowie `npm run build` ausführen.

## Aufgabe 01

`DestroyRef` als Feld injizieren und in `ngOnInit` an `takeUntilDestroyed(this.destroyRef)` übergeben. Subscription und Speichern-Verhalten bleiben bestehen.

## Aufgabe 02

Die Mutation durch eine neue Referenz ersetzen: `this.user = { ...this.user, role: 'Administrator' };`. Das Child bleibt OnPush und behält seinen Signal-Input sowie Signal-Output.

## Aufgabe 03

`count` zu `signal(0)` machen, im Template mit `count()` lesen, im Callback `count.update(count => count + 1)` und beim Reset `count.set(0)` verwenden.

## Aufgabe 04

`completedCount` mit `computed()` aus `tasks()` ableiten. Toggle und Hinzufügen liefern über `update()` eine neue Liste; beim Toggle entsteht zusätzlich ein neues Todo-Objekt.

## Aufgabe 05

`filteredTasks` als `computed()` modellieren, das `tasks()` und `filter()` synchron liest. Den Constructor-`effect()` vollständig entfernen: Er synchronisiert Derived State, liest nach `await` ungetrackt und liest/setzt dasselbe Signal.

## Aufgabe 06

`status` als Signal modellieren, im Template aufrufen und im Callback sowie beim Reset mit `set()` aktualisieren. Der normale Browser-Timer bleibt erhalten; das Signal-Update benachrichtigt Angular.

## Aufgabe 07

Das Service-Observable beibehalten und mit `toSignal()` oder `takeUntilDestroyed()` an der Async-Grenze anbinden. Auswahl und Suche werden Signals, aktive und sichtbare Personen `computed()`. Statusänderungen ersetzen Nutzer immutable. `ChangeDetectorRef`, kopierte Collections und Cleanup-Subscription entfallen; die Komponente verwendet OnPush.

Die Runtime-Checks akzeptieren absichtlich gleichwertige, verhaltensbasierte Lösungen. Architekturelle Rahmenbedingungen werden nicht durch fragile Source-Text-Prüfungen erzwungen.
