import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { BasePage } from '../../estruturaBase/BasePage';
import { BookModel } from '../../models/BookModel';
import { LivroServiceProvider } from '../../providers/livro-service/livro-service';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage extends BasePage{

  showSearch: boolean;
  books: BookModel[];
  searchTerm: string;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public bookService: LivroServiceProvider
  ) {
    super(loadingCtrl, alertCtrl, toastCtrl);

    this.showSearch = false;
  }

  showSearchbar(){
    this.showSearch = true;
  }

  hideSearchbar(){
    this.showSearch = false;
  }

  searchBooks(ev){
    this.showLoading('Carregando...');

    let search = ev.target.value;

    this.bookService.searchBooks().subscribe(
      data => {
        this.hideLoading();
        this.books = data;
      }, error => {
        this.hideLoading();
        this.showAlert('Não foi possível realizar a consulta', '');
      }
    );
  }

}
