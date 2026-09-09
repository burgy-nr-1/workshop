import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  OutputEmitterRef,
  input,
  output,
} from '@angular/core';

export interface User {
  id: number;
  name: string;
  role: 'Benutzer' | 'Administrator';
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  public readonly user: InputSignal<User> = input.required<User>();
  public readonly resetRequested: OutputEmitterRef<void> = output<void>();
}
