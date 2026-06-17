import { Component, } from "@angular/core";
import { BpmFwWriteComponent } from "@uofx/web-components/form";

@Component({
  selector: 'uofx-hello-world-write',
  template: `
    <div>
      <uofx-form-field-name [name]="name" [required]="required">
      </uofx-form-field-name>
    </div>
    <div class="fw-control">
      {{ label }}<br>
      <div class="fw-descr" *ngIf="showDescr && descr">
        {{ descr }}
      </div>
    </div>
  `
})

export class HelloWorldWriteComponent extends BpmFwWriteComponent {
  label: string = '🎉Hello World';
}
