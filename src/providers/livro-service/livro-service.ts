import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import { BookModel } from '../../models/BookModel';
import { MyBooksConsts } from '../../app/MyBooksConsts';
import { Observable } from 'rxjs/Observable';
import { NativeStorage } from '@ionic-native/native-storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


/*
  Generated class for the LivroServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LivroServiceProvider {

  token: string;

  constructor(public http: Http, private nativeStorage: NativeStorage, private transfer: FileTransfer) {
    console.log('Hello LivroServiceProvider Provider');

    this.nativeStorage.getItem('token_autenticacao')
    .then(
      data => this.token = data.token,
      erro => this.token = '<sem token>'
    );
  }

  createBook(livro: BookModel, fileURI: any){
    //Primeiro realiza o upload da imagem
    let thumbObservable = Observable.fromPromise(
      this.uploadThumb(fileURI).then(
        (data) => {
          var response = JSON.parse(data.response);
          return response.name;
        }, (error) => {
          return null;
        }
      )
    );

    //Aguarda o retorno da promisse do upload da imagem para cadastrar o livro
    return thumbObservable.flatMap(thumbName => {
      let dadosRequisicao = {
        titulo: livro.titulo,
        editora: livro.editora,
        dataDaPublicacao: livro.dataDaPublicacao,
        descricao: livro.descricao,
        autor: livro.autor,
        disponivelParaEmprestimo: livro.disponivelParaEmprestimo,
        thumb: thumbName,
        emprestimo: 0
      };
  
      let headers = new Headers();
      headers.set('Authorization', this.token);
  
      return this.http.post(MyBooksConsts.BASE_URL + MyBooksConsts.BOOK.CREATE, dadosRequisicao, {
        headers: headers
      })
      .map(response => {
        return response.json();
      });
    });
  }

  uploadThumb(fileURL: any){
    var uri = encodeURI(MyBooksConsts.BASE_URL + MyBooksConsts.BOOK.UPLOAD_THUMB);
    
    const fileTransfer: FileTransferObject = this.transfer.create();
    var headers = {'Authorization':this.token};

    let options: FileUploadOptions = {
      fileKey: 'thumb',
      fileName: fileURL.substr(fileURL.lastIndexOf('/')+1),
      headers: headers,
      httpMethod: 'POST',
      //chunkedMode: false,
    }

    return fileTransfer.upload(fileURL, uri, options);
  }

  getUserBooks(): Observable<BookModel[]>{
    let tokenObservable = Observable.fromPromise(
      this.nativeStorage.getItem('token_autenticacao')
      .then(
        (data) => {return data.token},
        (error) => {return error}
      )
    );

    return tokenObservable.flatMap(token => {
      let headers = new Headers();
      headers.set('Authorization', token);
  
      return this.http.get(MyBooksConsts.BASE_URL + MyBooksConsts.BOOK.GET_USER, {headers: headers})
      .map(
        (data) => {
          let responseBooks = data.json();
  
          let result: BookModel[] = responseBooks.map(function(book, index, array){
            let bookModel = new BookModel();
  
            bookModel.id = book.id;
            bookModel.titulo = book.titulo;
            bookModel.dataDaPublicacao = book.dataDaPublicacao;
            bookModel.thumb = book.thumb;
            bookModel.descricao = book.descricao;
            bookModel.disponivelParaEmprestimo = book.disponivelParaEmprestimo;
            bookModel.autor = book.autor;
            bookModel.usuario_id = book.usuario_id;
  
            return bookModel;
          });
  
          return result;
        }
      );
    });
  }

  searchBooks(): Observable<BookModel[]>{
    let tokenObservable = Observable.fromPromise(
      this.nativeStorage.getItem('token_autenticacao')
      .then(
        (data) => {return data.token},
        (error) => {return error}
      )
    );

    return tokenObservable.flatMap(token => {
      let headers = new Headers();
      headers.set('Authorization', token);
  
      return this.http.post(MyBooksConsts.BASE_URL + MyBooksConsts.BOOK.SEARCH, {}, {headers: headers})
      .map(
        (data) => {
          let responseBooks = data.json();
  
          let result: BookModel[] = responseBooks.map(function(book, index, array){
            let bookModel = new BookModel();
  
            bookModel.id = book.id;
            bookModel.titulo = book.titulo;
            bookModel.dataDaPublicacao = book.dataDaPublicacao;
            bookModel.thumb = book.thumb;
            bookModel.descricao = book.descricao;
            bookModel.disponivelParaEmprestimo = book.disponivelParaEmprestimo;
            bookModel.autor = book.autor;
            bookModel.usuario_id = book.usuario_id;
  
            return bookModel;
          });
  
          return result;
        }
      );
    });
  }

  deleteBook(book: BookModel): Observable<string>{
    let headers = new Headers();
    headers.set('Authorization', this.token);

    return this.http.delete(MyBooksConsts.BASE_URL + MyBooksConsts.BOOK.DELETE + '/'+book.id, {headers: headers})
    .map(
      (data) => {
        return data.json();
      }
    );
  }

}
