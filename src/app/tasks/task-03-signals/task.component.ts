import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-task-03',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class Task03Component {
  protected count = 0;

  protected receiveNotification(): void {
    setTimeout(() => {
      this.count += 1;
    }, 50);
  }

  protected reset(): void {
    this.count = 0;
  }
}
