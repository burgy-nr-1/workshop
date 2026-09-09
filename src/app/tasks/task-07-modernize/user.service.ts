import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

export interface WorkshopUser {
  id: number;
  name: string;
  role: string;
  active: boolean;
}

const USERS: readonly WorkshopUser[] = [
  { id: 1, name: 'Mina Keller', role: 'Frontend-Entwicklerin', active: true },
  { id: 2, name: 'Jonas Wolf', role: 'Platform Engineer', active: true },
  { id: 3, name: 'Lea Braun', role: 'Quality Engineer', active: false },
  { id: 4, name: 'Noah Fischer', role: 'Produktentwickler', active: true },
];

@Injectable({ providedIn: 'root' })
export class UserService {
  public getUsers(): Observable<WorkshopUser[]> {
    return of(USERS.map((user) => ({ ...user }))).pipe(delay(80));
  }
}
