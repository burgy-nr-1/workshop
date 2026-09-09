import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WORKSHOP_TASKS } from '../data/workshop-tasks';
import { ProgressService } from '../shared/progress.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-workshop-home',
  templateUrl: './workshop-home.component.html',
  styleUrl: './workshop-home.component.scss',
  imports: [RouterLink],
})
export class WorkshopHomeComponent {
  protected readonly tasks = WORKSHOP_TASKS;
  protected readonly progress = inject(ProgressService);
}
