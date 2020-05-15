import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgModule, Injectable } from '@angular/core';
import { TestListComponentGlobal } from './test-list/test-list.component';
import { MatTooltipModule } from '@angular/material';
import { PopupComponent } from './popup/popup.component';

// @Injectable()
@NgModule({
    declarations: [
        TestListComponentGlobal,
        PopupComponent,

    ],
    imports: [
        FormsModule,
        CommonModule,
        MatTooltipModule,

    ],
    providers: [],
    bootstrap: [],
    exports: [TestListComponentGlobal, FormsModule, CommonModule, PopupComponent]

})
export class GlobalModule { }
