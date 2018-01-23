import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AbastecimentoListaPage } from './abastecimento-lista';

@NgModule({
  declarations: [
    AbastecimentoListaPage,
  ],
  imports: [
    IonicPageModule.forChild(AbastecimentoListaPage),
  ],
  exports: [
    AbastecimentoListaPage
  ]
})
export class AbastecimentoListaPageModule {}
