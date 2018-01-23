import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VeiculoFotoPage } from './veiculo-foto';

@NgModule({
  declarations: [
    VeiculoFotoPage,
  ],
  imports: [
    IonicPageModule.forChild(VeiculoFotoPage),
  ],
  exports: [
    VeiculoFotoPage
  ]
})
export class VeiculoFotoPageModule {}
