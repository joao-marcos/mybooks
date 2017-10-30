import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoginModel } from '../../models/LoginModel';
import { Observable } from 'rxjs/Observable';
import { MyBooksConsts } from '../../app/MyBooksConsts';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the AutenticacaoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AutenticacaoServiceProvider {

  constructor(public http: Http, private nativeStorage : NativeStorage) {
    console.log('Hello AutenticacaoServiceProvider Provider');
  }

  login(loginModel: LoginModel): Observable<void>{
    let requestBody = {
      email: loginModel.email,
      senha: loginModel.senha
    }

    return this.http.post(MyBooksConsts.BASE_URL + MyBooksConsts.LOGIN, requestBody)
     .map(response => {
       let resp = response.json();
       this.nativeStorage.setItem('token_autenticacao', {token: resp.token})
        .then(
          () => console.log('token armazenado'),
          (erro) => console.log('Erro ao armazenar token', erro)
        )
     });

  }

}
