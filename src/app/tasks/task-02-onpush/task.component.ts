import { ChangeDetectionStrategy, Component, input } from '@angular/core';

interface User {
  id: number;
  name: string;
  role: 'User' | 'Admin';
}

@Component({
  selector: 'app-user-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="profile-panel" aria-label="Team member">
      <div class="person-row">
        <span class="avatar" aria-hidden="true">AM</span>
        <div>
          <span class="label">Team member</span>
          <h3>{{ user().name }}</h3>
        </div>
      </div>
      <div class="role-row">
        <span>Role</span>
        <strong data-testid="role">{{ user().role }}</strong>
      </div>
    </section>
  `,
})
export class UserCardComponent {
  readonly user = input.required<User>();
}

@Component({
  selector: 'app-task-02',
  imports: [UserCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task.component.html',
})
export class Task02Component {
  protected user: User = { id: 1, name: 'Alex Meyer', role: 'User' };
  protected requestStatus = 'No promotion requested';

  protected promote(): void {
    this.user.role = 'Admin';
    this.requestStatus = 'Promotion handler completed';
  }

  protected reset(): void {
    this.user = { id: 1, name: 'Alex Meyer', role: 'User' };
    this.requestStatus = 'No promotion requested';
  }
}
