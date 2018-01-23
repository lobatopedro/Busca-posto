import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import 'rxjs/add/operator/map';

@Injectable()
export class BancoProvider {

    constructor( private sqlite: SQLite ) {

    }

    dataBaseInit() {

        this.sqlite
            .create({
                name: 'superCarros.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql('CREATE TABLE IF NOT EXISTS veiculo ( id integer primary key, modelo varchar(255), km_inicial integer, foto BLOB )', {})
                  .then(() => {
                      console.log('tabela veiculo criada');
                  })
                  .catch(erro => {
                      console.log(erro);
                  });
            })
            .catch(erro => {
                console.log(erro);
            });


        this.sqlite
            .create({
                name: 'superCarros.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql('CREATE TABLE IF NOT EXISTS abastecimento ( id integer primary key, veiculo integer, km_atual integer, qtde_litros real )', {})
                  .then(() => {
                      console.log('tabela abastecimento criada');
                  })
                  .catch(erro => {
                      console.log(erro);
                  });
            })
            .catch(erro => {
                console.log(erro);
            });

    }


    abastecimentoInsere( veiculo, kmAtual, qtdeLitros) {

        this.sqlite
            .create({
                name: 'superCarros.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql('INSERT INTO abastecimento ( veiculo, km_atual, qtde_litros) VALUES (?, ?, ?)', [veiculo, kmAtual, qtdeLitros])
                  .then(() => {
                  })
                  .catch(erro => {
                      console.log(erro);
                  });
            })
            .catch(erro => {
                console.log(erro);
            });

    }



    veiculoInsere( modelo, kmInicial) {

        this.sqlite
            .create({
                name: 'superCarros.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
                db.executeSql('INSERT INTO veiculo (modelo, km_inicial) VALUES (?, ?)', [modelo, kmInicial])
                  .then(() => {
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
