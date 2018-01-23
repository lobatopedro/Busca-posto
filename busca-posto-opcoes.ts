import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-busca-posto-opcoes',
    templateUrl: 'busca-posto-opcoes.html',
})
export class BuscaPostoOpcoesPage {

    raio: any;

    constructor( public navCtrl: NavController,
                 public navParams: NavParams ) {

         this.raio = this.navParams.get('raio') / 1000;

    }

    salvar() {
        window.localStorage.setItem('raio', (this.raio * 1000).toString() );
        this.navCtrl.pop();
    }

}
