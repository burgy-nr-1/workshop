import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

export interface WorkshopUser {
  id: number;
  name: string;
  role: string;
  active: boolean;
}

const USERS: readonly WorkshopUser[] = [
  { id: 1, name: 'Mina Keller', role: 'Frontend developer', active: true },
  { id: 2, name: 'Jonas Wolf', role: 'Platform engineer', active: true },
  { id: 3, name: 'Lea Braun', role: 'Quality engineer', active: false },
  { id: 4, name: 'Noah Fischer', role: 'Product developer', active: true },
];

@Injectable({ providedIn: 'root' })
export class UserService {
  getUsers(): Observable<WorkshopUser[]> {
    return of(USERS.map((user) => ({ ...user }))).pipe(delay(80));
  }
}
