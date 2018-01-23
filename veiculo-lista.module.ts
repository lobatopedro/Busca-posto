import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VeiculoListaPage } from './veiculo-lista';

@NgModule({
  declarations: [
    VeiculoListaPage,
  ],
  imports: [
    IonicPageModule.forChild(VeiculoListaPage),
  ],
  exports: [
    VeiculoListaPage
  ]
})
export class VeiculoListaPageModule {}
