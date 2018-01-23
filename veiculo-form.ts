import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormBuilder, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';

import { BancoProvider } from '../../providers/banco/banco';

@IonicPage()
@Component({
    selector: 'page-veiculo-form',
    templateUrl: 'veiculo-form.html',
})

export class VeiculoFormPage {

    formVeiculo: any;

    constructor( public bancoProvider: BancoProvider,
                 public formBuilder: FormBuilder,
                 public navCtrl: NavController,
                 public navParams: NavParams,
                 private toastCtrl: ToastController ) {

        this.formVeiculo = this.formBuilder.group({
            modelo: ['', Validators.required],
            kmInicial: ['', Validators.required],
        });

    }

    formVeiculoSubmit() {

        if( this.formVeiculo.valid ) {
            this.bancoProvider.veiculoInsere( this.formVeiculo.value.modelo,
                                              this.formVeiculo.value.kmInicial );
            this.navCtrl.pop();
        } else {

            let toast = this.toastCtrl.create({
                message: 'Preencha todos os campos.',
                duration: 3000
            });

            toast.present();

        }

    }

}
