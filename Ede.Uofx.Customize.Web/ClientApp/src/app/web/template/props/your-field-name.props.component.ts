import { BpmFwPropsComponent } from '@uofx/web-components/form';
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'uofx-your-field-props',
  templateUrl: './your-field-name.props.component.html'
})
export class TemplatePropsComponent extends BpmFwPropsComponent implements OnInit {

  // @Input() exProps: YourFieldExProps;

  constructor(
    public fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    super(fb);
  }

  ngOnInit(){
    this.cdr.detectChanges();
  }
}

