import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePage } from '../../estruturaBase/BasePage';
import { BookModel } from '../../models/BookModel';
import { LivroServiceProvider } from '../../providers/livro-service/livro-service';


@IonicPage()
@Component({
  selector: 'page-modal-create-book',
  templateUrl: 'modal-create-book.html',
})
export class ModalCreateBookPage extends BasePage{

  createBookFrmGroup: FormGroup;
  submitAttemp: boolean = false;
  bookModel: BookModel;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public livroService: LivroServiceProvider,
    public toastCtrl: ToastController,
    loadingCtrl: LoadingController) {
      super(loadingCtrl, alertCtrl);

      this.bookModel = new BookModel();
      this.bookModel.disponivelParaEmprestimo = true;

      this.createBookFrmGroup = formBuilder.group({
        titulo: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
        editora: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
        dataDaPublicacao: ['', Validators.compose([Validators.required])],
        descricao: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
        quantidadeDeExemplares: ['', Validators.compose([Validators.required])],
        disponivelParaEmprestimo: ['', Validators.compose([Validators.required])],
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalCreateBookPage');
  }

  createBook(){
    this.submitAttemp = true;
    
    if(!this.createBookFrmGroup.valid){
      return;
    }

    this.showLoading('Carregando...');

    this.livroService.createBook(this.bookModel).subscribe(resp => {
      this.hideLoading();
      let toast = this.toastCtrl.create({
        message: 'Livro cadastrado com sucesso!',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();

      const dataReturn = {
        created: true
      }
      this.viewCtrl.dismiss(dataReturn);

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
    })
  }

  cleanForm(){
    this.submitAttemp = false;
    this.createBookFrmGroup.reset();
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
