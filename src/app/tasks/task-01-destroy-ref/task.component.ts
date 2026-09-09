import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-task-01',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class Task01Component implements OnInit {
  protected readonly lastHeartbeat = signal(0);
  protected saveStatus = 'Noch nicht gespeichert';

  public ngOnInit(): void {
    interval(1000)
      .pipe(takeUntilDestroyed())
      .subscribe((tick) => this.lastHeartbeat.set(tick + 1));
  }

  protected save(): void {
    this.saveStatus = 'Änderungen gespeichert';
  }
}
