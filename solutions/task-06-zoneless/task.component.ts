import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-task-06',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class Task06Component {
  protected readonly status = signal('Wartet');
  protected callbackRan = false;

  protected startSync(): void {
    this.status.set('Synchronisiert');
    this.callbackRan = false;

    setTimeout(() => {
      this.callbackRan = true;
      this.status.set('Bereit');
      console.info('Externer Sync-Callback abgeschlossen.');
    }, 80);
  }

  protected reset(): void {
    this.status.set('Wartet');
    this.callbackRan = false;
  }
}
