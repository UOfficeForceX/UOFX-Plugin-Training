import { UofxFormFieldBaseModule, UofxFormModule } from '@uofx/web-components/form';
import { UofxLoadingModule, UofxPaginationModule } from '@uofx/web-components';

import { NgModule } from '@angular/core';
import { UofxAvatarModule } from '@uofx/web-components/avatar';
import { UofxBreadcrumbModule } from '@uofx/web-components/breadcrumb';
import { UofxChipModule } from '@uofx/web-components/chip';
import { UofxDatePickerModule } from '@uofx/web-components/date-picker';
import { UofxDateRangeModule } from '@uofx/web-components/date-range';
import { UofxDialogModule } from '@uofx/web-components/dialog';
import { UofxDirectiveModule } from '@uofx/web-components';
import { UofxDropdownButtonModule } from '@uofx/web-components/dropdown-button';
import { UofxEmptyStatusModule } from '@uofx/web-components';
import { UofxFileHelperModule } from '@uofx/web-components/file-helper';
import { UofxIconModule } from '@uofx/web-components/icon';
import { UofxPipeModule } from '@uofx/web-components/pipes';
import { UofxRedirectModule } from '@uofx/web-components/redirect';
import { UofxSearchBarModule } from '@uofx/web-components/search-bar';
import { UofxTextEllipsisModule } from '@uofx/web-components/text-ellipsis';
import { UofxTextareaModule } from '@uofx/web-components/textarea';
import { UofxToastModule } from '@uofx/web-components/toast';
import { UofxTranslateModule } from '@uofx/web-components';
import { UofxTreeModule } from '@uofx/web-components/tree';
import { UofxUserSelectModule } from '@uofx/web-components/user-select';

@NgModule({
  exports: [
    UofxAvatarModule,
    UofxBreadcrumbModule,
    UofxChipModule,

    UofxDatePickerModule,
    UofxDateRangeModule,
    UofxDialogModule,
    UofxDirectiveModule,
    UofxDropdownButtonModule,

    UofxEmptyStatusModule,

    UofxFormFieldBaseModule,
    UofxFormModule,
    UofxFileHelperModule,

    UofxIconModule,

    UofxLoadingModule,
    UofxPaginationModule,
    UofxPipeModule,

    UofxRedirectModule,
    UofxSearchBarModule,

    UofxTextareaModule,
    UofxTextEllipsisModule,
    UofxToastModule,

    UofxTranslateModule,

    UofxTreeModule,
    UofxUserSelectModule
  ]
})
export class UofxPackageModule { }

