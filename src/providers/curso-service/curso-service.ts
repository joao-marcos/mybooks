import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { MyBooksConsts } from '../../app/MyBooksConsts';
import { CursoModel } from '../../models/CursoModel';

/*
  Generated class for the CursoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CursoServiceProvider {

  constructor(public http: Http) {
    console.log('Hello CursoServiceProvider Provider');
  }

  getAll(): Observable<CursoModel[]> {
    return this.http.get(MyBooksConsts.BASE_URL + MyBooksConsts.Curso.GET, {})
    .map(response => {
      let resp = response.json();
      
      let result: CursoModel[] = resp.map(function(curso, index, array){
        let c: CursoModel = new CursoModel();

        c.id = curso.id;
        c.nome = curso.nome;

        return c;
      });

      return result;
    });
  }

}
