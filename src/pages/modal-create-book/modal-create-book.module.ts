import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalCreateBookPage } from './modal-create-book';

@NgModule({
  declarations: [
    ModalCreateBookPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalCreateBookPage),
  ],
})
export class ModalCreateBookPageModule {}
