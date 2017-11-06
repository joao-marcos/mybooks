import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { BasePage } from '../../estruturaBase/BasePage';
import { BookModel } from '../../models/BookModel';
import { LivroServiceProvider } from '../../providers/livro-service/livro-service';

@Component({
  selector: 'page-book',
  templateUrl: 'book.html'
})
export class BookPage extends BasePage{

  books: BookModel[];

  constructor(
    public navCtrl: NavController, 
    private modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public bookService: LivroServiceProvider
  ) {
    super(loadingCtrl, alertCtrl, toastCtrl);

    this.showLoading('Carregando...');
    this.getBooksUser();
  }

  getBooksUser(){
    this.bookService.getUserBooks().subscribe(
      (data) => {
        this.books = data;
        this.hideLoading();
      }, (error) => {
        this.showAlert('Erro Livros', 'Não foi possível consultar os livros');
        this.hideLoading();
      }
    );
  }

  openModalCreateBook(){
    const myModal = this.modalCtrl.create('ModalCreateBookPage');
    myModal.present();

    myModal.onDidDismiss((data) => {
      if(data.created){
        this.showLoading('Carregando...');
        this.getBooksUser();
      }
    });
  }

  confirmDeleteBook(book: BookModel){
    let confirm = this.alertCtrl.create({
      title: 'Dejesa realmente excluir este livro?',
      message: book.titulo,
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.deleteBook(book);
          }
        }
      ]
    });
    confirm.present();
  }

  deleteBook(book: BookModel){
    this.showLoading('Carregando...');

    this.bookService.deleteBook(book).subscribe(
      data => {
        this.hideLoading();
        let resp = JSON.parse(JSON.stringify(data));

        if(resp.success){
          this.showToast(resp.message);
          this.getBooksUser();
          return;
        }
        
        this.showAlert('Não foi possível excluir o livro', resp.message);

      }, error => {
        this.hideLoading();
        this.showAlert('Erro ao excluir', 'Não foi possível excluir o livro');
      }
    );
  }

}
