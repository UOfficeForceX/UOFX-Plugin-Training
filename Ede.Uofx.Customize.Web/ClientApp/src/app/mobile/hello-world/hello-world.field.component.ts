import { Component } from '@angular/core';
import { BpmFwWriteComponent } from '@uofx/app-components/form';

@Component({
  selector: 'uofx-mobile-hello-world',
  template: `
    <div>
      <uofx-form-field-name [name]="name" [required]="required">
      </uofx-form-field-name>
    </div>
    <div class="fw-control">
      {{ label }}<br>
      <div class="fw-descr" *ngIf="descr">
        {{ descr }}
      </div>
    </div>
  `
})
export class HelloWorldComponent extends BpmFwWriteComponent {
  label: string = '🎉Hello World';
}

