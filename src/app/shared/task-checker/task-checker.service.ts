import { Injectable } from '@angular/core';
import { TaskCheckResult } from './task-checker.types';

const pause = (milliseconds: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, milliseconds));

@Injectable({ providedIn: 'root' })
export class TaskCheckerService {
  async check(
    taskId: string,
    root: HTMLElement,
    initializationFailed: boolean,
  ): Promise<TaskCheckResult> {
    if (initializationFailed) {
      return this.failure(
        'The exercise still fails during initialization.',
        'Open the browser console and inspect the first Angular error. The Save handler is not the first failure.',
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
          'Checker unavailable.',
          'Return to the challenge list and reopen this task.',
        );
    }
  }

  private async checkTask01(root: HTMLElement): Promise<TaskCheckResult> {
    const save = this.button(root, 'save');
    if (!save) return this.missingDemo();
    save.click();
    await pause(30);
    return this.text(root, 'save-status') === 'Changes saved'
      ? this.success()
      : this.failure(
          'Save did not complete.',
          'The component initializes now, but the visible success state is still missing.',
        );
  }

  private async checkTask02(root: HTMLElement): Promise<TaskCheckResult> {
    this.button(root, 'reset')?.click();
    await pause(30);
    const initial = this.text(root, 'role');
    this.button(root, 'promote')?.click();
    await pause(40);
    const promoted = this.text(root, 'role');
    return initial === 'User' && promoted === 'Admin'
      ? this.success()
      : this.failure(
          'The child still displays “User”.',
          'The click handler ran, but the child view did not receive the kind of change Angular is watching for.',
          [`Initial role: ${initial || 'missing'}`, `After promotion: ${promoted || 'missing'}`],
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
          'The counter missed an asynchronous state change.',
          'The value changes in JavaScript, but every transition must also reach the rendered view.',
          [`Expected: ${expected.join(' → ')}`, `Observed: ${observed.join(' → ')}`],
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
          'The completed total drifted away from the task list.',
          'One source-state transition still requires manual synchronization.',
          [`Expected: ${expected.join(' → ')}`, `Observed: ${observed.join(' → ')}`],
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
    const expected = ['3 shown', '2 shown', '1 shown', '2 shown', '2 shown'];

    return observed.every((value, index) => value === expected[index])
      ? this.success()
      : this.failure(
          'The filtered list is still stale.',
          'Changing both the source list and selected filter must recompute the same derived result.',
          [`Expected: ${expected.join(' → ')}`, `Observed: ${observed.join(' → ')}`],
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
    return status === 'Ready'
      ? this.success()
      : this.failure(
          'The callback completed, but the view is still waiting.',
          'Keep the async mechanism and provide Angular an appropriate notification for view-relevant state.',
          [`Rendered status: ${status || 'missing'}`],
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

    return initial === '3 active' && afterToggle === '2 active' && visibleUsers === 2
      ? this.success()
      : this.failure(
          'The active-user view is still copied state.',
          'Changing source state should update every derived count and list without a manual synchronization step.',
          [
            `Initial: ${initial || 'missing'}`,
            `After status change: ${afterToggle || 'missing'}`,
            `Visible active users: ${visibleUsers}`,
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
    return { passed: true, title: 'Challenge solved', message: 'Every observed behavior passed.' };
  }

  private failure(title: string, message: string, details?: string[]): TaskCheckResult {
    return { passed: false, title, message, details };
  }

  private missingDemo(): TaskCheckResult {
    return this.failure(
      'The live example is incomplete.',
      'Restore the exercise controls and try the check again.',
    );
  }
}
