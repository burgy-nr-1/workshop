import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({
  selector: 'app-task-01',
  templateUrl: './task.component.html',
})
export class Task01ReferenceComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  protected lastHeartbeat = 0;
  protected saveStatus = 'Not saved';

  ngOnInit(): void {
    interval(1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((tick) => (this.lastHeartbeat = tick + 1));
  }

  protected save(): void {
    this.saveStatus = 'Changes saved';
  }
}
