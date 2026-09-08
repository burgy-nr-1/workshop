import { Injectable, computed, signal } from '@angular/core';
import { WORKSHOP_TASKS } from '../data/workshop-tasks';

const STORAGE_KEY = 'angular-22-workshop-progress';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly solved = signal<ReadonlySet<string>>(this.read());

  readonly solvedCount = computed(() => this.solved().size);
  readonly totalCount = WORKSHOP_TASKS.length;
  readonly percent = computed(() => (this.solvedCount() / this.totalCount) * 100);

  isSolved(taskId: string): boolean {
    return this.solved().has(taskId);
  }

  markSolved(taskId: string): void {
    const next = new Set(this.solved()).add(taskId);
    this.solved.set(next);
    this.write(next);
  }

  reset(): void {
    this.solved.set(new Set());
    globalThis.localStorage?.removeItem(STORAGE_KEY);
  }

  private read(): ReadonlySet<string> {
    try {
      const stored = JSON.parse(globalThis.localStorage?.getItem(STORAGE_KEY) ?? '[]');
      return new Set(Array.isArray(stored) ? stored.filter((id) => typeof id === 'string') : []);
    } catch {
      return new Set();
    }
  }

  private write(value: ReadonlySet<string>): void {
    globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify([...value]));
  }
}
