import { Component, effect, signal } from '@angular/core';

type TaskFilter = 'all' | 'open' | 'done';

interface BoardTask {
  id: number;
  title: string;
  done: boolean;
}

const INITIAL_TASKS: BoardTask[] = [
  { id: 1, title: 'Draft release notes', done: true },
  { id: 2, title: 'Review pull request', done: false },
  { id: 3, title: 'Update test plan', done: true },
];

@Component({
  selector: 'app-task-05',
  templateUrl: './task.component.html',
})
export class Task05Component {
  protected readonly tasks = signal(INITIAL_TASKS.map((task) => ({ ...task })));
  protected filter: TaskFilter = 'all';
  protected readonly filteredTasks = signal(this.tasks());

  private readonly synchronizeFilter = effect(() => {
    const tasks = this.tasks();
    this.filteredTasks.set(tasks.filter((task) => this.matches(task, this.filter)));
  });

  protected setFilter(filter: TaskFilter): void {
    this.filter = filter;
  }

  protected addOpenTask(): void {
    const id = Math.max(...this.tasks().map((task) => task.id)) + 1;
    this.tasks.update((tasks) => [...tasks, { id, title: `Follow-up ${id}`, done: false }]);
  }

  protected reset(): void {
    this.filter = 'all';
    this.tasks.set(INITIAL_TASKS.map((task) => ({ ...task })));
  }

  private matches(task: BoardTask, filter: TaskFilter): boolean {
    return filter === 'all' || (filter === 'done' ? task.done : !task.done);
  }
}
