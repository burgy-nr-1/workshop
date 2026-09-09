import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-workshop-header',
  templateUrl: './workshop-header.component.html',
  styleUrl: './workshop-header.component.scss',
  imports: [RouterLink],
})
export class WorkshopHeaderComponent {}
