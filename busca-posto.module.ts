import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscaPostoPage } from './busca-posto';

@NgModule({
  declarations: [
    BuscaPostoPage,
  ],
  imports: [
    IonicPageModule.forChild(BuscaPostoPage),
  ],
  exports: [
    BuscaPostoPage
  ]
})
export class BuscaPostoPageModule {}
