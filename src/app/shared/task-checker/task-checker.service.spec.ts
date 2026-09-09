import { TaskCheckerService } from './task-checker.service';

describe('TaskCheckerService', () => {
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
