import { TestBed } from '@angular/core/testing';
import { ProgressService } from './progress.service';

describe('ProgressService', () => {
  beforeEach(() => localStorage.clear());

  it('speichert gelöste Aufgaben und setzt Fortschritt ohne Source-Änderung zurück', () => {
    const service = TestBed.inject(ProgressService);
    service.markSolved('task-02');

    expect(service.isSolved('task-02')).toBe(true);
    expect(service.solvedCount()).toBe(1);
    expect(localStorage.getItem('angular-22-workshop-progress')).toContain('task-02');

    service.reset();
    expect(service.solvedCount()).toBe(0);
  });
});
