import { TaskCheckerService } from './task-checker.service';

describe('TaskCheckerService', () => {
  it('lehnt Aufgabe 2 ab, wenn nur die noch ausstehende Reset-Prüfung die Mutation rendert', async () => {
    const root = document.createElement('div');
    root.innerHTML = `
      <strong data-testid="role">Benutzer</strong>
      <button data-testid="promote"></button>
      <button data-testid="reset"></button>
    `;
    const role = root.querySelector<HTMLElement>('[data-testid="role"]')!;
    let user: { role: 'Benutzer' | 'Administrator' } = { role: 'Benutzer' };

    root.querySelector('[data-testid="reset"]')!.addEventListener('click', () => {
      user = { role: 'Benutzer' };
      setTimeout(() => (role.textContent = user.role));
    });
    root.querySelector('[data-testid="promote"]')!.addEventListener('click', () => {
      user.role = 'Administrator';
    });

    const result = await new TaskCheckerService().check('task-02', root, false);

    expect(result.passed).toBe(false);
  });

  it('prüft Aufgabe 3 anhand der tatsächlichen DOM-Übergänge', async () => {
    const root = document.createElement('div');
    root.innerHTML = `
      <span data-testid="count">0</span>
      <button data-testid="increment"></button>
      <button data-testid="reset"></button>
    `;
    const count = root.querySelector<HTMLElement>('[data-testid="count"]')!;
    let value = 0;

    root.querySelector('[data-testid="increment"]')!.addEventListener('click', () => {
      setTimeout(() => {
        value += 1;
        count.textContent = String(value);
      });
    });
    root.querySelector('[data-testid="reset"]')!.addEventListener('click', () => {
      value = 0;
      count.textContent = String(value);
    });

    const result = await new TaskCheckerService().check('task-03', root, false);

    expect(result.passed).toBe(true);
  });
});
