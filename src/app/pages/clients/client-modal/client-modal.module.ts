import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientModalComponent } from './client-modal.component';

@NgModule({
  declarations: [
   ClientModalComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
   ClientModalComponent,
  ]
})
export class ClientModalModule {}