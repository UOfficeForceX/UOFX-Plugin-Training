import { BpmFwPropsComponent } from '@uofx/web-components/form';
import { Component } from "@angular/core";
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'uofx-hello-world-props',
  template: `<div class="padding-2x">目前沒有任何可設置屬性</div>`
})
export class HelloWorldPropsComponent extends BpmFwPropsComponent {
  constructor(public fb: FormBuilder) {
    super(fb);
  }
}

