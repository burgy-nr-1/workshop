import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { WORKSHOP_TASKS } from './data/workshop-tasks';

describe('workshop application', () => {
  it('renders the persistent workshop header', async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Tech & Learn');
    expect(fixture.nativeElement.textContent).toContain('Angular 22');
  });

  it('registers seven independently routable challenges', () => {
    expect(WORKSHOP_TASKS).toHaveLength(7);
    expect(new Set(WORKSHOP_TASKS.map((task) => task.slug)).size).toBe(7);
  });
});
