import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AbastecimentoFormPage } from './abastecimento-form';

@NgModule({
  declarations: [
    AbastecimentoFormPage,
  ],
  imports: [
    IonicPageModule.forChild(AbastecimentoFormPage),
  ],
  exports: [
    AbastecimentoFormPage
  ]
})
export class AbastecimentoFormPageModule {}
