import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { WorkshopUser } from '../user.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent {
  @Input({ required: true })
  public user!: WorkshopUser;

  @Input({ required: true })
  public activeCount!: number;

  @Output()
  public readonly statusChange = new EventEmitter<number>();

  protected requestStatusChange(): void {
    this.statusChange.emit(this.user.id);
  }
}
