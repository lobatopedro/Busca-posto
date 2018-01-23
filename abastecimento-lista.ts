import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@IonicPage()
@Component({
    selector: 'page-abastecimento-lista',
    templateUrl: 'abastecimento-lista.html',
})
export class AbastecimentoListaPage {

    abastecimentos: any;

    constructor( public navCtrl: NavController,
                 public navParams: NavParams,
                 private sqlite: SQLite ) {
    }


    abastecimentoBuscaTodos() {

        this.sqlite
            .create({
                name: 'superCarros.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql( 'SELECT abastecimento.*, veiculo.modelo, veiculo.foto ' +
                               'FROM abastecimento ' +
                               'INNER JOIN veiculo ON abastecimento.veiculo = veiculo.id', [])
                  .then(( resposta ) => {
                      let abastecimentos: any;
                          abastecimentos = [];

                      for (let i = 0; i < resposta.rows.length; i++) {

                         abastecimentos[ abastecimentos.length ] = { id: resposta.rows.item(i).id,
                                                                     foto: resposta.rows.item(i).foto,
                                                                     kmAtual: resposta.rows.item(i).km_atual,
                                                                     modelo: resposta.rows.item(i).modelo,
                                                                     qtdeLitros: resposta.rows.item(i).qtde_litros,
                                                                     veiculo: resposta.rows.item(i).veiculo };
                      }

                      console.log( abastecimentos );

                      this.abastecimentos = abastecimentos;

                  })
                  .catch(erro => {
                      console.log(erro);
                  });
            })
            .catch(erro => {
                console.log(erro);
            });

    }


    abastecimentoExclui( id ) {

        this.sqlite
            .create({
                name: 'superCarros.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql('DELETE FROM abastecimento WHERE id = ?', [ id ])
                  .then(( resposta ) => {
                      this.abastecimentoBuscaTodos();
                  })
                  .catch(erro => {
                      console.log(erro);
                  });
            })
            .catch(erro => {
                console.log(erro);
            });

    }


    abreAbastecimentoForm() {
        this.navCtrl.push('AbastecimentoFormPage');
    }

    ionViewWillEnter() {
        this.abastecimentoBuscaTodos();
    }


}
