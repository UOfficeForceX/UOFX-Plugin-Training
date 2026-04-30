import { Component, Input, OnInit } from '@angular/core';
import { UofxDialog, UofxDialogModule } from '@uofx/web-components/dialog';

import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { UofxConsole } from '@uofx/core';

@Component({
  standalone: true,
  selector: 'web-panel-view',
  templateUrl: './view.dialog.html',
  imports: [
    CommonModule,
    DialogModule,
    UofxDialogModule,
  ]
})
export class PanelViewDialog extends UofxDialog implements OnInit {
  @Input() params: { name: string; }

  ngOnInit() {
    UofxConsole.log('PanelViewDialog params.name',this.params?.name);
  }
}
