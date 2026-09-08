import { Type } from '@angular/core';
import { Task01Component } from './task-01-destroy-ref/task.component';
import { Task02Component } from './task-02-onpush/task.component';
import { Task03Component } from './task-03-signals/task.component';
import { Task04Component } from './task-04-computed/task.component';
import { Task05Component } from './task-05-effect/task.component';
import { Task06Component } from './task-06-zoneless/task.component';
import { Task07Component } from './task-07-modernize/task.component';

export const TASK_COMPONENTS: Readonly<Record<string, Type<unknown>>> = {
  'task-01': Task01Component,
  'task-02': Task02Component,
  'task-03': Task03Component,
  'task-04': Task04Component,
  'task-05': Task05Component,
  'task-06': Task06Component,
  'task-07': Task07Component,
};
