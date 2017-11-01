import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { BookPage } from '../pages/book/book';
import { SearchPage } from '../pages/search/search';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { CadastrarUsuarioPage } from '../pages/cadastrar-usuario/cadastrar-usuario';
import { LoanPage } from '../pages/loan/loan';
import { ProfilePage } from '../pages/profile/profile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsuarioServiceProvider } from '../providers/usuario-service/usuario-service';
import { InstituicaoServiceProvider } from '../providers/instituicao-service/instituicao-service';
import { CursoServiceProvider } from '../providers/curso-service/curso-service';
import { AutenticacaoServiceProvider } from '../providers/autenticacao-service/autenticacao-service';
import { NativeStorage } from '@ionic-native/native-storage';

@NgModule({
  declarations: [
    MyApp,
    BookPage,
    SearchPage,
    HomePage,
    TabsPage,
    LoginPage,
    CadastrarUsuarioPage,
    LoanPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BookPage,
    SearchPage,
    HomePage,
    TabsPage,
    LoginPage,
    CadastrarUsuarioPage,
    LoanPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioServiceProvider,
    InstituicaoServiceProvider,
    CursoServiceProvider,
    AutenticacaoServiceProvider,
    NativeStorage
  ]
})
export class AppModule {}
