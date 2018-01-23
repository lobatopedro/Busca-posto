
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AbastecimentoListaPage } from '../pages/abastecimento-lista/abastecimento-lista';
import { VeiculoListaPage } from '../pages/veiculo-lista/veiculo-lista';
import { BuscaPostoPage } from '../pages/busca-posto/busca-posto';


import { SQLite  } from '@ionic-native/sqlite';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpModule } from '@angular/http';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Camera } from '@ionic-native/camera';

import { BancoProvider } from '../providers/banco/banco';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AbastecimentoListaPage,
    BuscaPostoPage,
    VeiculoListaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AbastecimentoListaPage,
    BuscaPostoPage,
    VeiculoListaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BancoProvider,
    SQLite,
    Geolocation,
    LaunchNavigator,
    Camera
  ]
})
export class AppModule {}
