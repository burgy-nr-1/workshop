import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

@Component({
  template: `<button type="button" (click)="save()">Speichern</button><span>{{ status() }}</span>`,
})
class Task01ReferenceHarness implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  readonly status = signal('Noch nicht gespeichert');

  ngOnInit(): void {
    of(1).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  save(): void {
    this.status.set('Änderungen gespeichert');
  }
}

describe('Referenzabnahme für Aufgabe 01', () => {
  it('initialisiert in einem gültigen Injection Context und speichert', async () => {
    const fixture = TestBed.createComponent(Task01ReferenceHarness);
    expect(() => fixture.detectChanges()).not.toThrow();

    fixture.nativeElement.querySelector('button').click();
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Änderungen gespeichert');
  });
});
