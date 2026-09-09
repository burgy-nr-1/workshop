import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { WORKSHOP_TASKS } from './data/workshop-tasks';

describe('Workshop-Anwendung', () => {
  it('rendert die dauerhafte Workshop-Kopfzeile', async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Tech & Learn');
    expect(fixture.nativeElement.textContent).toContain('Angular 22');
  });

  it('registriert sechs unabhängig routbare Aufgaben', () => {
    expect(WORKSHOP_TASKS).toHaveLength(6);
    expect(new Set(WORKSHOP_TASKS.map((task) => task.slug)).size).toBe(6);
  });
});
