import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BancoProvider } from '../../providers/banco/banco';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    veiculos: any;

    constructor( public bancoProvider: BancoProvider,
                 public navCtrl: NavController,
                 private sqlite: SQLite ) {

        this.bancoProvider.dataBaseInit();

    }

    ionViewWillEnter() {
        this.veiculoBuscaMedias();
    }

    veiculoBuscaMedias() {

        this.sqlite
            .create({
                name: 'superCarros.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql(' SELECT id , modelo,' +

                            ' ( SELECT km_atual ' +
                              ' FROM abastecimento ' +
                              ' WHERE veiculo = veiculo.id ' +
                              ' ORDER BY km_atual DESC ' +
                              ' LIMIT 1 ) AS total_km, ' +

                            ' ( SELECT SUM(qtde_litros) ' +
                              ' FROM abastecimento ' +
                              ' WHERE veiculo = veiculo.id ) AS total_litros ' +

                              ' FROM veiculo ' +
                              ' ORDER BY modelo ', [])
                  .then(( resposta ) => {

                      let veiculos;
                          veiculos = [];

                      for (let i = 0; i < resposta.rows.length; i++) {

                         veiculos[ veiculos.length ] = { modelo: resposta.rows.item(i).modelo,
                                                         total_km: resposta.rows.item(i).total_km,
                                                         total_litros: resposta.rows.item(i).total_litros,
                                 media: resposta.rows.item(i).total_km / resposta.rows.item(i).total_litros  };

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
