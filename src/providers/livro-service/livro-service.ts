import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { BookModel } from '../../models/BookModel';
import { MyBooksConsts } from '../../app/MyBooksConsts';
import { Observable } from 'rxjs/Observable';
import { NativeStorage } from '@ionic-native/native-storage';

/*
  Generated class for the LivroServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LivroServiceProvider {

  token: string;

  constructor(public http: Http, private nativeStorage: NativeStorage) {
    console.log('Hello LivroServiceProvider Provider');

    this.nativeStorage.getItem('token_autenticacao')
    .then(
      data => this.token = data.token,
      erro => this.token = '<sem token>'
    );
  }

  createBook(livro: BookModel): Observable<string>{
    let dadosRequisicao = {
      titulo: livro.titulo,
      editora: livro.editora,
      dataDaPublicacao: livro.dataDaPublicacao,
      descricao: livro.descricao,
      quantidadeDeExemplares: livro.quantidadeDeExemplares,
      disponivelParaEmprestimo: livro.disponivelParaEmprestimo
    };

    let headers = new Headers();
    headers.set('Authorization', this.token);

    return this.http.post(MyBooksConsts.BASE_URL + MyBooksConsts.BOOK.CREATE, dadosRequisicao, {
      headers: headers
    })
    .map(response => {
      return response.json();
    });
  }

}
