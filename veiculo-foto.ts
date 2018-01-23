import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@IonicPage()
@Component({
    selector: 'page-veiculo-foto',
    templateUrl: 'veiculo-foto.html',
})

export class VeiculoFotoPage {

    veiculoId: any;
    foto: any;

    constructor( private camera: Camera,
                 public navCtrl: NavController,
                 public navParams: NavParams,
                 private sqlite: SQLite) {

         this.abreCamera();
         this.veiculoId = this.navParams.get(' id ');

    }

    abreCamera() {
        const options: CameraOptions = {
            allowEdit: true,
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            //mediaType: this.camera.MediaType.PICTURE
            saveToPhotoAlbum: true
        }

        this.camera.getPicture(options).then((imageData) => {
            this.foto = 'data:image/jpeg;base64,' + imageData;

            console.log( this.foto);

        }, (erro) => {
            console.log( erro );
        });
    }

    cancelar() {
        this.navCtrl.pop();
    }

    confirmar() {

      this.sqlite
          .create({
              name: 'superCarros.db',
              location: 'default'
          })
          .then((db: SQLiteObject) => {
              db.executeSql('UPDATE veiculo SET foto = ? WHERE id = ? ', [ this.foto, this.veiculoId ] )
                .then(() => {
                    this.navCtrl.pop();
                })
                .catch(erro => {
                    console.log(erro);
                });
          })
          .catch(erro => {
              console.log(erro);
          });

    }

    tentarNovamente() {
        this.abreCamera();
    }


}
