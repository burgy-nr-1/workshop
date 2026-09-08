import {
  AfterViewInit,
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
  selector: 'app-task-runner',
  template: `
    <div class="runner-surface">
      <div [hidden]="failed()"><ng-container #host /></div>
      @if (failed()) {
        <section class="runner-error" role="status">
          <span class="runner-error-icon" aria-hidden="true">!</span>
          <div>
            <h3>The exercise failed during initialization.</h3>
            <p>That is part of the challenge. Open the browser console for more information.</p>
          </div>
        </section>
      }
    </div>
  `,
})
export class TaskRunnerComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input({ required: true }) component!: Type<unknown>;
  @ViewChild('host', { read: ViewContainerRef }) private host?: ViewContainerRef;

  protected readonly failed = signal(false);
  private componentRef?: ComponentRef<unknown>;
  private loadedComponent?: Type<unknown>;

  constructor(readonly element: ElementRef<HTMLElement>) {}

  get initializationFailed(): boolean {
    return this.failed();
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => this.load());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['component'] && this.host) queueMicrotask(() => this.load());
  }

  ngOnDestroy(): void {
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
      console.error('Challenge initialization failed:', error);
      this.host.clear();
      this.componentRef = undefined;
      this.failed.set(true);
    }
  }
}
