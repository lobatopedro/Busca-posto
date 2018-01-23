import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VeiculoFormPage } from './veiculo-form';

@NgModule({
  declarations: [
    VeiculoFormPage,
  ],
  imports: [
    IonicPageModule.forChild(VeiculoFormPage),
  ],
  exports: [
    VeiculoFormPage
  ]
})
export class VeiculoFormPageModule {}
