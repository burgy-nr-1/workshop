import { Injectable } from '@angular/core';
import { TaskCheckResult } from './task-checker.types';

const pause = (milliseconds: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, milliseconds));

@Injectable({ providedIn: 'root' })
export class TaskCheckerService {
  public async check(
    taskId: string,
    root: HTMLElement,
    initializationFailed: boolean,
  ): Promise<TaskCheckResult> {
    if (initializationFailed) {
      return this.failure(
        'Die Aufgabe scheitert noch bei der Initialisierung.',
        'Öffne die Browser-Konsole und prüfe den ersten Angular-Fehler. Der Speichern-Handler ist nicht die erste Ursache.',
      );
    }

    switch (taskId) {
      case 'task-01':
        return this.checkTask01(root);
      case 'task-02':
        return this.checkTask02(root);
      case 'task-03':
        return this.checkTask03(root);
      case 'task-04':
        return this.checkTask04(root);
      case 'task-05':
        return this.checkTask05(root);
      case 'task-06':
        return this.checkTask06(root);
      case 'task-07':
        return this.checkTask07(root);
      default:
        return this.failure(
          'Für diese Aufgabe gibt es keinen Check.',
          'Kehre zur Übersicht zurück und öffne die Aufgabe erneut.',
        );
    }
  }

  private async checkTask01(root: HTMLElement): Promise<TaskCheckResult> {
    const save = this.button(root, 'save');
    if (!save) return this.missingDemo();
    save.click();
    await pause(30);
    return this.text(root, 'save-status') === 'Änderungen gespeichert'
      ? this.success()
      : this.failure(
          'Speichern wurde nicht abgeschlossen.',
          'Die Komponente startet jetzt, aber der sichtbare Erfolgsstatus fehlt noch.',
        );
  }

  private async checkTask02(root: HTMLElement): Promise<TaskCheckResult> {
    this.button(root, 'reset')?.click();
    await pause(30);
    const initial = this.text(root, 'role');
    this.button(root, 'promote')?.click();
    await pause(40);
    const promoted = this.text(root, 'role');
    return initial === 'Benutzer' && promoted === 'Administrator'
      ? this.success()
      : this.failure(
          'Das Child zeigt weiterhin „Benutzer“ an.',
          'Der Handler lief, aber die Child-View erhielt nicht die Änderung, auf die OnPush achtet.',
          [`Ausgangsrolle: ${initial || 'fehlt'}`, `Nach der Änderung: ${promoted || 'fehlt'}`],
        );
  }

  private async checkTask03(root: HTMLElement): Promise<TaskCheckResult> {
    const increment = this.button(root, 'increment');
    const reset = this.button(root, 'reset');
    if (!increment || !reset) return this.missingDemo();

    reset.click();
    await pause(30);
    const observed = [this.text(root, 'count')];
    increment.click();
    await pause(90);
    observed.push(this.text(root, 'count'));
    increment.click();
    await pause(90);
    observed.push(this.text(root, 'count'));
    reset.click();
    await pause(30);
    observed.push(this.text(root, 'count'));
    increment.click();
    await pause(90);
    observed.push(this.text(root, 'count'));

    const expected = ['0', '1', '2', '0', '1'];
    return observed.every((value, index) => value === expected[index])
      ? this.success()
      : this.failure(
          'Der Zähler hat ein asynchrones Update verpasst.',
          'Der JavaScript-Wert ändert sich, aber jeder Übergang muss auch die gerenderte View erreichen.',
          [`Erwartet: ${expected.join(' → ')}`, `Beobachtet: ${observed.join(' → ')}`],
        );
  }

  private async checkTask04(root: HTMLElement): Promise<TaskCheckResult> {
    this.button(root, 'reset')?.click();
    await pause(30);
    const observed = [this.text(root, 'completed-count')];
    this.button(root, 'toggle-2')?.click();
    await pause(30);
    observed.push(this.text(root, 'completed-count'));
    this.button(root, 'toggle-2')?.click();
    await pause(30);
    observed.push(this.text(root, 'completed-count'));
    this.button(root, 'add-task')?.click();
    await pause(30);
    observed.push(this.text(root, 'completed-count'));
    const expected = ['2 / 3', '3 / 3', '2 / 3', '2 / 4'];

    return observed.every((value, index) => value === expected[index])
      ? this.success()
      : this.failure(
          'Zähler und Todo-Liste sind nicht mehr konsistent.',
          'Mindestens ein Update liefert dem Signal noch keine neue Referenz oder hält kopierten Zustand synchron.',
          [`Erwartet: ${expected.join(' → ')}`, `Beobachtet: ${observed.join(' → ')}`],
        );
  }

  private async checkTask05(root: HTMLElement): Promise<TaskCheckResult> {
    this.button(root, 'reset')?.click();
    await pause(40);
    const observed = [this.text(root, 'visible-count')];
    this.button(root, 'filter-done')?.click();
    await pause(30);
    observed.push(this.text(root, 'visible-count'));
    this.button(root, 'filter-open')?.click();
    await pause(30);
    observed.push(this.text(root, 'visible-count'));
    this.button(root, 'add-open')?.click();
    await pause(30);
    observed.push(this.text(root, 'visible-count'));
    this.button(root, 'filter-done')?.click();
    await pause(30);
    observed.push(this.text(root, 'visible-count'));
    const expected = ['3 angezeigt', '2 angezeigt', '1 angezeigt', '2 angezeigt', '2 angezeigt'];

    return observed.every((value, index) => value === expected[index])
      ? this.success()
      : this.failure(
          'Die gefilterte Liste ist noch veraltet.',
          'Source-Liste und Filter müssen denselben abgeleiteten Wert neu berechnen.',
          [`Erwartet: ${expected.join(' → ')}`, `Beobachtet: ${observed.join(' → ')}`],
        );
  }

  private async checkTask06(root: HTMLElement): Promise<TaskCheckResult> {
    const start = this.button(root, 'start-sync');
    if (!start) return this.missingDemo();
    this.button(root, 'reset')?.click();
    await pause(20);
    start.click();
    await pause(150);
    const status = this.text(root, 'sync-status');
    return status === 'Bereit'
      ? this.success()
      : this.failure(
          'Der Callback ist fertig, aber die View wartet noch.',
          'Behalte den Async-Mechanismus bei und benachrichtige Angular passend über den View-Zustand.',
          [`Gerenderter Status: ${status || 'fehlt'}`],
        );
  }

  private async checkTask07(root: HTMLElement): Promise<TaskCheckResult> {
    for (
      let attempt = 0;
      attempt < 10 && root.querySelector('[data-testid="loading"]');
      attempt += 1
    ) {
      await pause(40);
    }

    const initial = this.text(root, 'active-count');
    this.button(root, 'user-1')?.click();
    await pause(20);
    this.button(root, 'toggle-active')?.click();
    await pause(40);
    const afterToggle = this.text(root, 'active-count');
    const visibleUsers = root.querySelectorAll('button[data-testid^="user-"]').length;

    return initial === '3 aktiv' && afterToggle === '2 aktiv' && visibleUsers === 2
      ? this.success()
      : this.failure(
          'Die Ansicht aktiver Teammitglieder ist noch kopierter Zustand.',
          'Eine Änderung der Source of Truth muss jede Liste und jeden Zähler ohne manuelle Synchronisierung aktualisieren.',
          [
            `Ausgangswert: ${initial || 'fehlt'}`,
            `Nach Statusänderung: ${afterToggle || 'fehlt'}`,
            `Sichtbare aktive Personen: ${visibleUsers}`,
          ],
        );
  }

  private button(root: HTMLElement, testId: string): HTMLButtonElement | null {
    return root.querySelector<HTMLButtonElement>(`button[data-testid="${testId}"]`);
  }

  private text(root: HTMLElement, testId: string): string {
    return root.querySelector(`[data-testid="${testId}"]`)?.textContent?.trim() ?? '';
  }

  private success(): TaskCheckResult {
    return {
      passed: true,
      title: 'Aufgabe gelöst',
      message: 'Alle geprüften Zustandsübergänge funktionieren.',
    };
  }

  private failure(title: string, message: string, details?: string[]): TaskCheckResult {
    return { passed: false, title, message, details };
  }

  private missingDemo(): TaskCheckResult {
    return this.failure(
      'Das Live-Beispiel ist unvollständig.',
      'Stelle die Bedienelemente der Aufgabe wieder her und starte den Check erneut.',
    );
  }
}
