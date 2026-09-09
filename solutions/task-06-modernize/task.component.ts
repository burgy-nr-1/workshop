import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService, WorkshopUser } from './user.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-task-06',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class Task06Component {
  private readonly userService = inject(UserService);
  protected readonly users = signal<WorkshopUser[]>([]);
  protected readonly selectedUserId = signal<number | undefined>(undefined);
  protected readonly searchTerm = signal('');
  protected readonly loading = signal(true);
  protected readonly activeUsers = computed(() => this.users().filter((user) => user.active));
  protected readonly visibleUsers = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    return this.activeUsers().filter((user) => user.name.toLowerCase().includes(search));
  });
  protected readonly selectedUser = computed(() =>
    this.users().find((user) => user.id === this.selectedUserId()),
  );

  constructor() {
    this.userService
      .getUsers()
      .pipe(takeUntilDestroyed())
      .subscribe((users) => {
        this.users.set(users);
        this.selectedUserId.set(users.find((user) => user.active)?.id);
        this.loading.set(false);
      });
  }

  protected select(user: WorkshopUser): void {
    this.selectedUserId.set(user.id);
  }

  protected updateSearch(value: string): void {
    this.searchTerm.set(value);
  }

  protected toggleSelectedStatus(): void {
    const selected = this.selectedUser();
    if (!selected) return;
    this.users.update((users) =>
      users.map((user) => (user.id === selected.id ? { ...user, active: !user.active } : user)),
    );
  }
}
