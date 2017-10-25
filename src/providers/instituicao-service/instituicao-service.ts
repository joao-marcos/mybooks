import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { InstituicaoModel } from '../../models/InstituicaoModel';
import { MyBooksConsts } from '../../app/MyBooksConsts';

/*
  Generated class for the InstituicaoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InstituicaoServiceProvider {

  constructor(public http: Http) {
    console.log('Hello InstituicaoServiceProvider Provider');
  }

  getAll(): Observable<InstituicaoModel[]>{
    return this.http.get(MyBooksConsts.BASE_URL + MyBooksConsts.Instituicao.GET, {})
    .map(response => {
      let resp = response.json();
      
      let result: InstituicaoModel[] = resp.map(function(instituicao, index, array){
        let i: InstituicaoModel = new InstituicaoModel();

        i.id = instituicao.id;
        i.nome = instituicao.nome;

        return i;
      });

      return result;
    })


  }

}
