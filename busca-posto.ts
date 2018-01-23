import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

import { Http, Response } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

declare var google;

@IonicPage()
@Component({
    selector: 'page-busca-posto',
    templateUrl: 'busca-posto.html',
})

export class BuscaPostoPage {

    latitude: any;
    longitude: any;
    erro: any;

    loading: any;
    postos: any;
    raio: any;
    map: any;

    constructor( private geolocation: Geolocation,
                 public http: Http,
                 private launchNavigator: LaunchNavigator,
                 public loadingCtrl: LoadingController,
                 public navCtrl: NavController,
                 public navParams: NavParams ) {

       this.raio = 5000;

    }


    abreOpcoes() {
        this.navCtrl.push('BuscaPostoOpcoesPage', {
            raio: this.raio
        });
    }


    buscaCoordenadas() {

        this.geolocation.getCurrentPosition().then((resp) => {

            this.latitude  = resp.coords.latitude;
            this.longitude = resp.coords.longitude;

            this.buscaPosto();
            this.mapaInit();

        }).catch((error) => {
            this.erro = JSON.stringify(error);
        });

    }

    buscaPosto() {

        this.loading = this.loadingCtrl.create();
        this.loading.present();

        let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
                   this.latitude + ',' + this.longitude + '&radius=' + this.raio +
                   '&types=gas_station&key=AIzaSyB1w9K6PvrtRfyfAE8vLOBAmyqynv7xGpE';

        this.http.get(url)
            .map((res:Response) => res.json())
            .subscribe(( resposta ) => {

                let postos;
                    postos = [];

                for (let i = 0; i < resposta.results.length; i++) {
                   postos[ postos.length ] = { nome: resposta.results[i].name,
                                               endereco: resposta.results[i].vicinity,
                                               latitude: resposta.results[i].geometry.location.lat,
                                               longitude: resposta.results[i].geometry.location.lng };
                }

                this.postos = postos;

                this.mapaMarcaPostos();

                this.loading.dismiss();

            }, (error) => {
                console.log('DEU ERRO');
                this.loading.dismiss();
            });

    }


    ionViewWillEnter() {

        if( parseInt(window.localStorage.getItem('raio')) > 0 ) {
            this.raio = window.localStorage.getItem('raio');
        }

        this.buscaCoordenadas();

    }


    mapaInit() {

        let options = {
                  center: new google.maps.LatLng( this.latitude, this.longitude ),
                  mapTypeId: google.maps.MapTypeId.ROADMAP,
                  zoom: 15
                }

        this.map = new google.maps.Map(document.getElementById("map_canvas"), options);

        this.mapaMarcaPosicaoAtual();
        this.mapaCirculo();

    }


    mapaCirculo() {

        new google.maps.Circle({
            strokeColor: '#1899D7',
            strokeOpacity: 0.7,
            strokeWeight: 1,
            fillColor: '#1899D7',
            fillOpacity: 0.15,
            map: this.map,
            center: new google.maps.LatLng( this.latitude, this.longitude ),
            radius: parseInt(this.raio)
        });

    }


    mapaMarcaPosicaoAtual() {

        new google.maps.Marker({
            map: this.map,
            position: new google.maps.LatLng( this.latitude, this.longitude )
        });

    }


    mapaMarcaPostos() {

        for( let i=0 ; i < this.postos.length; i++ ) {
            new google.maps.Marker({
                map: this.map,
                position: new google.maps.LatLng( this.postos[i].latitude, this.postos[i].longitude ),
                icon: 'https://maps.google.com/mapfiles/kml/shapes/info.png'
            });
        }

    }


    navegaPosto( latitude, longitude ) {
        //this.launchNavigator.navigate( [latitude, longitude] );

        window.open('http://maps.google.com/?saddr=Current%20Location&daddr=' + latitude+ ',' + longitude, '_blank')
    }


}
