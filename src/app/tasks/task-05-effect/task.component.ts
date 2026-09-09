import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';

type TaskFilter = 'all' | 'open' | 'done';

interface BoardTask {
  id: number;
  title: string;
  done: boolean;
}

const INITIAL_TASKS: BoardTask[] = [
  { id: 1, title: 'Release Notes entwerfen', done: true },
  { id: 2, title: 'Pull Request prüfen', done: false },
  { id: 3, title: 'Testplan aktualisieren', done: true },
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-task-05',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class Task05Component {
  protected readonly tasks = signal(INITIAL_TASKS.map((task) => ({ ...task })));
  protected readonly filter = signal<TaskFilter>('all');
  protected readonly filteredTasks = signal(this.tasks());
  protected readonly filterOptions: readonly TaskFilter[] = ['all', 'open', 'done'];
  protected readonly filterLabels: Readonly<Record<TaskFilter, string>> = {
    all: 'Alle',
    open: 'Offen',
    done: 'Erledigt',
  };

  constructor() {
    effect(async () => {
      const tasks = this.tasks();
      await Promise.resolve();
      const filter = this.filter();
      this.filter.set(filter);
      this.filteredTasks.set(tasks.filter((task) => this.matches(task, filter)));
    });
  }

  protected setFilter(filter: TaskFilter): void {
    this.filter.set(filter);
  }

  protected addOpenTask(): void {
    const id = Math.max(...this.tasks().map((task) => task.id)) + 1;
    this.tasks.update((tasks) => [...tasks, { id, title: `Nachbereitung ${id}`, done: false }]);
  }

  protected reset(): void {
    this.filter.set('all');
    this.tasks.set(INITIAL_TASKS.map((task) => ({ ...task })));
  }

  private matches(task: BoardTask, filter: TaskFilter): boolean {
    return filter === 'all' || (filter === 'done' ? task.done : !task.done);
  }
}
