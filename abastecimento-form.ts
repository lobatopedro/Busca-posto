import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormBuilder, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { BancoProvider } from '../../providers/banco/banco';

@IonicPage()
@Component({
    selector: 'page-abastecimento-form',
    templateUrl: 'abastecimento-form.html',
})
export class AbastecimentoFormPage {

    formAbastecimento: any;
    veiculos: any;

    constructor( public bancoProvider: BancoProvider,
                 public formBuilder: FormBuilder,
                 public navCtrl: NavController,
                 public navParams: NavParams,
                 private toastCtrl: ToastController,
                 private sqlite: SQLite ) {

        this.formAbastecimento = this.formBuilder.group({
            veiculo: ['', Validators.required],
            kmAtual: ['', Validators.required],
            qtdeLitros: ['', Validators.required],
        });

        this.veiculoBuscaTodos();

    }

    formAbastecimentoSubmit() {

        if( this.formAbastecimento.valid ) {
            this.bancoProvider.abastecimentoInsere( this.formAbastecimento.value.veiculo,
                                                    this.formAbastecimento.value.kmAtual,
                                                    this.formAbastecimento.value.qtdeLitros );
            this.navCtrl.pop();
        } else {

            let toast = this.toastCtrl.create({
                message: 'Preencha todos os campos.',
                duration: 3000
            });

            toast.present();

        }

    }


    veiculoBuscaTodos() {

        this.sqlite
            .create({
                name: 'superCarros.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql('SELECT * FROM veiculo ORDER BY modelo', [])
                  .then(( resposta ) => {
                      let veiculos: any;
                          veiculos = [];

                      for (let i = 0; i < resposta.rows.length; i++) {
                         veiculos[ veiculos.length ] = { id: resposta.rows.item(i).id,
                                                         modelo: resposta.rows.item(i).modelo,
                                                         kmInicial: resposta.rows.item(i).km_inicial };
                      }

                      this.veiculos = veiculos;

                  })
                  .catch(erro => {
                      console.log(erro);
                  });
            })
            .catch(erro => {
                console.log(erro);
            });

    }



}
