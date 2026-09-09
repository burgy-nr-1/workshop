import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  OutputEmitterRef,
  input,
  output,
} from '@angular/core';
import { WorkshopUser } from '../user.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent {
  public readonly user: InputSignal<WorkshopUser> = input.required<WorkshopUser>();
  public readonly activeCount: InputSignal<number> = input.required<number>();
  public readonly statusChange: OutputEmitterRef<number> = output<number>();

  protected requestStatusChange(): void {
    this.statusChange.emit(this.user().id);
  }
}
