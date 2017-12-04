import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { BasePage } from '../../estruturaBase/BasePage';
import { BookModel } from '../../models/BookModel';
import { LivroServiceProvider } from '../../providers/livro-service/livro-service';
import { EmprestimoServiceProvider } from '../../providers/emprestimo-service/emprestimo-service';


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
    public bookService: LivroServiceProvider,
    public loanService: EmprestimoServiceProvider
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

  solicitarEmprestimo(idLivro){
    let confirm = this.alertCtrl.create({
      title: 'Solicitar Empréstimo',
      message: "Informe a data de Devolução",
      inputs: [
        {
          name: 'dt_devolucao',
          placeholder: 'Devolução',
          type: 'date'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Solicitar',
          handler: data => {
            this.showLoading('Carregando...');
            
            this.loanService.cadastrarEmprestimo(idLivro, data.dt_devolucao).subscribe(resp => {
              this.hideLoading();
              this.showToast('Empréstimo solicitado com sucesso!');
            }, error => {
              this.hideLoading();
              let response = JSON.parse(error._body);
        
              if(response.message){
                this.showAlert('Erro', response.message);
              }
        
              for(var key in response.errors){
                  let errorText =  response.errors[key].join(' ');
                  this.showAlert(response.message, errorText);
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }

  searchBooks(ev){
    let search = ev.target.value;
    
    if(search == '')
      return;
    
    this.showLoading('Carregando...');

    this.bookService.searchBooks(search).subscribe(
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
