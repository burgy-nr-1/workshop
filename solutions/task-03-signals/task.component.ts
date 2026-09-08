import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-task-03',
  templateUrl: './task.component.html',
})
export class Task03Component {
  protected readonly count = signal(0);

  protected receiveNotification(): void {
    setTimeout(() => this.count.update((count) => count + 1), 50);
  }

  protected reset(): void {
    this.count.set(0);
  }
}
