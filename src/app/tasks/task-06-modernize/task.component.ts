import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService, WorkshopUser } from './user.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-task-06',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class Task06Component implements OnInit, OnDestroy {
  private readonly userService = inject(UserService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly subscriptions = new Subscription();

  protected users: WorkshopUser[] = [];
  protected activeUsers: WorkshopUser[] = [];
  protected visibleUsers: WorkshopUser[] = [];
  protected selectedUser?: WorkshopUser;
  protected searchTerm = '';
  protected loading = false;

  public ngOnInit(): void {
    this.loading = true;

    this.subscriptions.add(
      this.userService.getUsers().subscribe((users) => {
        this.users = users;
        this.activeUsers = users.filter((user) => user.active);
        this.visibleUsers = [...this.activeUsers];
        this.selectedUser = this.activeUsers[0];
        this.loading = false;
        this.cdr.detectChanges();
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  protected select(user: WorkshopUser): void {
    this.selectedUser = user;
  }

  protected updateSearch(value: string): void {
    this.searchTerm = value;
    this.visibleUsers = this.activeUsers.filter((user) =>
      user.name.toLowerCase().includes(value.trim().toLowerCase()),
    );
  }

  protected toggleSelectedStatus(): void {
    if (!this.selectedUser) return;

    this.selectedUser.active = !this.selectedUser.active;
    this.cdr.detectChanges();
  }
}
