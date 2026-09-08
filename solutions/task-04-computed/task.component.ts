import { Component, computed, signal } from '@angular/core';

interface SprintTask {
  id: number;
  title: string;
  completed: boolean;
}

const INITIAL_TASKS: SprintTask[] = [
  { id: 1, title: 'Set up project', completed: true },
  { id: 2, title: 'Build dashboard', completed: false },
  { id: 3, title: 'Add tests', completed: true },
];

@Component({
  selector: 'app-task-04',
  templateUrl: './task.component.html',
})
export class Task04Component {
  protected readonly tasks = signal(INITIAL_TASKS.map((task) => ({ ...task })));
  protected readonly completedCount = computed(
    () => this.tasks().filter((task) => task.completed).length,
  );

  protected toggle(id: number): void {
    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    );
  }

  protected addTask(): void {
    const id = Math.max(...this.tasks().map((task) => task.id)) + 1;
    this.tasks.update((tasks) => [...tasks, { id, title: `Review item ${id}`, completed: false }]);
  }

  protected reset(): void {
    this.tasks.set(INITIAL_TASKS.map((task) => ({ ...task })));
  }
}
