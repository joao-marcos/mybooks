import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { NativeStorage } from '@ionic-native/native-storage';
import { MyBooksConsts } from '../../app/MyBooksConsts';
import { LoanModel } from '../../models/LoanModel';

/*
  Generated class for the EmprestimoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EmprestimoServiceProvider {

  token: string;
  
  constructor(public http: Http, private nativeStorage: NativeStorage) {
    this.nativeStorage.getItem('token_autenticacao')
    .then(
      data => this.token = data.token,
      erro => this.token = '<sem token>'
    );
  }

  cadastrarEmprestimo(idLivro: number, previsaoDevolucao: Date){
    let requestBody = {
      id_livro: idLivro,
      previsao_devolucao: previsaoDevolucao
    };

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
  
      return this.http.post(MyBooksConsts.BASE_URL + MyBooksConsts.LOAN.ALL, requestBody, {headers: headers})
      .map(
        (data) => {
          return data.json();
        }
      );
    });
  }

  getUserLoans(): Observable<LoanModel[]>{
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
  
      return this.http.get(MyBooksConsts.BASE_URL + MyBooksConsts.LOAN.ALL, {headers: headers})
      .map(
        (data) => {
          let responseLoans = data.json();
  
          let result: LoanModel[] = responseLoans.map(function(loan, index, array){
            let loanModel = new LoanModel();
  
            loanModel.id = loan.id;
            loanModel.idLivro = loan.id_livro;
            loanModel.titulo = loan.titulo;
            loanModel.thumb = loan.thumb;
            loanModel.previsaoDevolucao = loan.previsao_devolucao;
            loanModel.dtDevolvido = loan.dt_devolvido;
            loanModel.usuarioSolicitante = loan.usuario_solicitante;
            loanModel.status = loan.status;
            loanModel.tipo = loan.tipo;
  
            return loanModel;
          });
  
          return result;
        }
      );
    });
  }

  updateUserLoan(id: number, status: string){
    let requestBody = {
      id: id,
      status: status
    };

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
  
      return this.http.put(MyBooksConsts.BASE_URL + MyBooksConsts.LOAN.ALL, requestBody, {headers: headers})
      .map(
        (data) => {
          return data.json();
        }
      );
    });
  }

}
