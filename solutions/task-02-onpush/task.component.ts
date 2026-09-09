import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User, UserCardComponent } from './user-card/user-card.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-task-02',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  imports: [UserCardComponent],
})
export class Task02Component {
  protected user: User = { id: 1, name: 'Alex Meyer', role: 'Benutzer' };
  protected requestStatus = 'Keine Rollenänderung angefordert';

  protected promote(): void {
    this.user = { ...this.user, role: 'Administrator' };
    this.requestStatus = 'Handler für Rollenänderung abgeschlossen';
  }

  protected reset(): void {
    this.user = { id: 1, name: 'Alex Meyer', role: 'Benutzer' };
    this.requestStatus = 'Keine Rollenänderung angefordert';
  }
}
