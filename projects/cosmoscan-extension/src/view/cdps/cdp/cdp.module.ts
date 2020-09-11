import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdpComponent } from './cdp.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@view-ce/material.module';

@NgModule({
  declarations: [CdpComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  exports: [CdpComponent],
})
export class CdpModule {}
