import { Component } from '@angular/core';

@Component({
  selector: 'app-task-06',
  templateUrl: './task.component.html',
})
export class Task06Component {
  protected status = 'Waiting';
  protected callbackRan = false;

  protected startSync(): void {
    this.status = 'Syncing';
    this.callbackRan = false;

    setTimeout(() => {
      this.callbackRan = true;
      this.status = 'Ready';
      console.info('External sync callback completed.');
    }, 80);
  }

  protected reset(): void {
    this.status = 'Waiting';
    this.callbackRan = false;
  }
}
