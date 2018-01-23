import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';



@IonicPage()
@Component({
    selector: 'page-veiculo-lista',
    templateUrl: 'veiculo-lista.html',
})
export class VeiculoListaPage {

    veiculos: any;

    constructor( public navCtrl: NavController,
                 public navParams: NavParams,
                 private sqlite: SQLite ) {
    }

    abreVeiculoForm() {
      this.navCtrl.push('VeiculoFormPage');
    }

    ionViewWillEnter() {
        this.veiculoBuscaTodos();
    }

    tiraFoto( id ) {
      this.navCtrl.push('VeiculoFotoPage', {
        id: id
      })
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
                                                         kmInicial: resposta.rows.item(i).km_inicial,
                                                         foto: resposta.rows.item(i).foto};
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
