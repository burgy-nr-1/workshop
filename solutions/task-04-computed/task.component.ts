import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

interface SprintTask {
  id: number;
  title: string;
  completed: boolean;
}

const INITIAL_TASKS: SprintTask[] = [
  { id: 1, title: 'Projekt einrichten', completed: true },
  { id: 2, title: 'Dashboard entwickeln', completed: false },
  { id: 3, title: 'Tests ergänzen', completed: true },
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-task-04',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
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
    this.tasks.update((tasks) => [...tasks, { id, title: `Review-Punkt ${id}`, completed: false }]);
  }

  protected reset(): void {
    this.tasks.set(INITIAL_TASKS.map((task) => ({ ...task })));
  }
}
