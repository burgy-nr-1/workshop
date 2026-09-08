import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-task-06',
  templateUrl: './task.component.html',
})
export class Task06Component {
  protected readonly status = signal('Waiting');
  protected callbackRan = false;

  protected startSync(): void {
    this.status.set('Syncing');
    this.callbackRan = false;

    setTimeout(() => {
      this.callbackRan = true;
      this.status.set('Ready');
      console.info('External sync callback completed.');
    }, 80);
  }

  protected reset(): void {
    this.status.set('Waiting');
    this.callbackRan = false;
  }
}
