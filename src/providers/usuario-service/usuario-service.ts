import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { MyBooksConsts } from '../../app/MyBooksConsts';
import { UserModel } from '../../models/UserModel';

/*
  Generated class for the UsuarioServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioServiceProvider {

  constructor(public http: Http) {
    console.log('Hello UsuarioServiceProvider Provider');
  }

  cadastrarUsuario(usuario: UserModel): Observable<string>{

    let dadosRequisicao = {
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      telefone: usuario.telefone,
      instituicao_id: usuario.instituicao_id,
      curso_id: usuario.curso_id
    };

    return this.http.post(MyBooksConsts.BASE_URL + MyBooksConsts.User.CAD, dadosRequisicao)
    .map(response => {
      return response.json();
    });
  }

}
