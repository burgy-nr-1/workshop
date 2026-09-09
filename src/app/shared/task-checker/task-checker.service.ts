import { Injectable } from '@angular/core';
import { TaskCheckResult } from './task-checker.types';

@Injectable({ providedIn: 'root' })
export class TaskCheckerService {
  public async check(
    taskId: string,
    root: HTMLElement,
    initializationFailed: boolean,
  ): Promise<TaskCheckResult> {
    if (initializationFailed) {
      return taskId === 'task-01'
        ? this.failure(
            'Die Aufgabe scheitert noch bei der Initialisierung.',
            'Öffne die Browser-Konsole und prüfe den ersten Angular-Fehler. Der Speichern-Handler ist nicht die erste Ursache.',
          )
        : this.failure(
            'Das Live-Beispiel scheitert bei der Initialisierung.',
            'Öffne die Browser-Konsole und prüfe den ersten Angular-Fehler in der bearbeiteten Aufgabe.',
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
    const status = await this.waitForText(root, 'save-status', 'Änderungen gespeichert');
    return status === 'Änderungen gespeichert'
      ? this.success()
      : this.failure(
          'Speichern wurde nicht abgeschlossen.',
          'Die Komponente startet jetzt, aber der sichtbare Erfolgsstatus fehlt noch.',
        );
  }

  private async checkTask02(root: HTMLElement): Promise<TaskCheckResult> {
    const reset = this.button(root, 'reset');
    const promote = this.button(root, 'promote');
    if (!reset || !promote) return this.missingDemo();

    reset.click();
    const initial = await this.waitForText(root, 'role', 'Benutzer');
    promote.click();
    const promoted = await this.waitForText(root, 'role', 'Administrator');
    reset.click();
    const resetRole = await this.waitForText(root, 'role', 'Benutzer');

    return initial === 'Benutzer' && promoted === 'Administrator' && resetRole === 'Benutzer'
      ? this.success()
      : this.failure(
          'Rollenänderung oder Reset erreicht das Child noch nicht zuverlässig.',
          'Neue Input-Referenz und Reset-Output müssen beide die gerenderte Rolle aktualisieren.',
          [
            `Ausgangsrolle: ${initial || 'fehlt'}`,
            `Nach der Änderung: ${promoted || 'fehlt'}`,
            `Nach dem Reset: ${resetRole || 'fehlt'}`,
          ],
        );
  }

  private async checkTask03(root: HTMLElement): Promise<TaskCheckResult> {
    const increment = this.button(root, 'increment');
    const reset = this.button(root, 'reset');
    if (!increment || !reset) return this.missingDemo();

    reset.click();
    const observed = [await this.waitForText(root, 'count', '0')];
    increment.click();
    observed.push(await this.waitForText(root, 'count', '1'));
    increment.click();
    observed.push(await this.waitForText(root, 'count', '2'));
    reset.click();
    observed.push(await this.waitForText(root, 'count', '0'));
    increment.click();
    observed.push(await this.waitForText(root, 'count', '1'));

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
    const observed = [await this.waitForText(root, 'completed-count', '2 / 3')];
    this.button(root, 'toggle-2')?.click();
    observed.push(await this.waitForText(root, 'completed-count', '3 / 3'));
    this.button(root, 'toggle-2')?.click();
    observed.push(await this.waitForText(root, 'completed-count', '2 / 3'));
    this.button(root, 'add-task')?.click();
    observed.push(await this.waitForText(root, 'completed-count', '2 / 4'));
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
    const observed = [await this.waitForText(root, 'visible-count', '3 angezeigt')];
    this.button(root, 'filter-done')?.click();
    observed.push(await this.waitForText(root, 'visible-count', '2 angezeigt'));
    this.button(root, 'filter-open')?.click();
    observed.push(await this.waitForText(root, 'visible-count', '1 angezeigt'));
    this.button(root, 'add-open')?.click();
    observed.push(await this.waitForText(root, 'visible-count', '2 angezeigt'));
    this.button(root, 'filter-done')?.click();
    observed.push(await this.waitForText(root, 'visible-count', '2 angezeigt'));
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
    await this.waitFor(root, () => !root.querySelector('[data-testid="loading"]'), 1000);

    const search = root.querySelector<HTMLInputElement>('[data-testid="search"]');
    const toggle = this.button(root, 'toggle-active');
    if (!search || !toggle) return this.missingDemo();

    const initial = this.text(root, 'active-count');
    const initialVisibleUsers = root.querySelectorAll('button[data-testid^="user-"]').length;

    search.value = 'Jonas';
    search.dispatchEvent(new Event('input', { bubbles: true }));
    await this.waitFor(
      root,
      () => root.querySelectorAll('button[data-testid^="user-"]').length === 1,
    );
    const searchResult = root.querySelectorAll('button[data-testid^="user-"]').length;
    const searchFoundJonas = this.button(root, 'user-2') !== null;

    search.value = '';
    search.dispatchEvent(new Event('input', { bubbles: true }));
    await this.waitFor(
      root,
      () => root.querySelectorAll('button[data-testid^="user-"]').length === 3,
    );

    this.button(root, 'user-2')?.click();
    const selectedName = await this.waitForText(root, 'selected-name', 'Jonas Wolf');
    this.button(root, 'toggle-active')?.click();
    const afterToggle = await this.waitForText(root, 'active-count', '2 aktiv');
    await this.waitFor(
      root,
      () => root.querySelectorAll('button[data-testid^="user-"]').length === 2,
    );
    const visibleUsers = root.querySelectorAll('button[data-testid^="user-"]').length;
    const selectedStatus = await this.waitForText(root, 'selected-status', 'Inaktiv');

    return initial === '3 aktiv' &&
      initialVisibleUsers === 3 &&
      searchResult === 1 &&
      searchFoundJonas &&
      selectedName === 'Jonas Wolf' &&
      afterToggle === '2 aktiv' &&
      visibleUsers === 2 &&
      selectedStatus === 'Inaktiv'
      ? this.success()
      : this.failure(
          'Mindestens ein Teil des Team-Dashboards bleibt veraltet.',
          'Laden, Suche, Auswahl und Statusänderung müssen aus derselben Source of Truth reagieren.',
          [
            `Ausgangswert: ${initial || 'fehlt'}`,
            `Anfangs sichtbare Personen: ${initialVisibleUsers}`,
            `Suchtreffer für Jonas: ${searchResult}`,
            `Jonas gefunden: ${searchFoundJonas ? 'ja' : 'nein'}`,
            `Auswahl: ${selectedName || 'fehlt'}`,
            `Nach Statusänderung: ${afterToggle || 'fehlt'}`,
            `Sichtbare aktive Personen: ${visibleUsers}`,
            `Ausgewählter Status: ${selectedStatus || 'fehlt'}`,
          ],
        );
  }

  private button(root: HTMLElement, testId: string): HTMLButtonElement | null {
    return root.querySelector<HTMLButtonElement>(`button[data-testid="${testId}"]`);
  }

  private text(root: HTMLElement, testId: string): string {
    return root.querySelector(`[data-testid="${testId}"]`)?.textContent?.trim() ?? '';
  }

  private waitForText(
    root: HTMLElement,
    testId: string,
    expected: string,
    timeoutMilliseconds = 500,
  ): Promise<string> {
    return this.waitFor(root, () => this.text(root, testId) === expected, timeoutMilliseconds).then(
      () => this.text(root, testId),
    );
  }

  private waitFor(
    root: HTMLElement,
    condition: () => boolean,
    timeoutMilliseconds = 500,
  ): Promise<void> {
    if (condition()) return Promise.resolve();

    return new Promise((resolve) => {
      const observer = new MutationObserver(() => {
        if (!condition()) return;
        clearTimeout(timeout);
        observer.disconnect();
        resolve();
      });
      const timeout = setTimeout(() => {
        observer.disconnect();
        resolve();
      }, timeoutMilliseconds);

      observer.observe(root, { characterData: true, childList: true, subtree: true });
    });
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
