import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-task-06',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class Task06Component {
  protected status = 'Wartet';
  protected callbackRan = false;

  protected startSync(): void {
    this.status = 'Synchronisiert';
    this.callbackRan = false;

    setTimeout(() => {
      this.callbackRan = true;
      this.status = 'Bereit';
      console.info('Externer Sync-Callback abgeschlossen.');
    }, 80);
  }

  protected reset(): void {
    this.status = 'Wartet';
    this.callbackRan = false;
  }
}
