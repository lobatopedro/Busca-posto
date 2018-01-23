import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscaPostoOpcoesPage } from './busca-posto-opcoes';

@NgModule({
  declarations: [
    BuscaPostoOpcoesPage,
  ],
  imports: [
    IonicPageModule.forChild(BuscaPostoOpcoesPage),
  ],
  exports: [
    BuscaPostoOpcoesPage
  ]
})
export class BuscaPostoOpcoesPageModule {}
