import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  Type,
  ViewChild,
  ViewContainerRef,
  signal,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-task-runner',
  templateUrl: './task-runner.component.html',
  styleUrl: './task-runner.component.scss',
})
export class TaskRunnerComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input({ required: true }) public component!: Type<unknown>;
  @ViewChild('host', { read: ViewContainerRef }) private host?: ViewContainerRef;

  protected readonly failed = signal(false);

  private componentRef?: ComponentRef<unknown>;
  private loadedComponent?: Type<unknown>;

  constructor(public readonly element: ElementRef<HTMLElement>) {}

  public get initializationFailed(): boolean {
    return this.failed();
  }

  public ngAfterViewInit(): void {
    queueMicrotask(() => this.load());
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['component'] && this.host) queueMicrotask(() => this.load());
  }

  public ngOnDestroy(): void {
    this.componentRef?.destroy();
  }

  private load(): void {
    if (!this.host || !this.component || this.loadedComponent === this.component) return;
    this.loadedComponent = this.component;
    this.host.clear();
    this.failed.set(false);

    try {
      this.componentRef = this.host.createComponent(this.component);
      this.componentRef.changeDetectorRef.detectChanges();
    } catch (error) {
      console.error('Die Aufgabe ist bei der Initialisierung fehlgeschlagen:', error);
      this.host.clear();
      this.componentRef = undefined;
      this.failed.set(true);
    }
  }
}
