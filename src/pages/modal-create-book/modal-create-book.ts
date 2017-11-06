import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController, ToastController, ActionSheetController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePage } from '../../estruturaBase/BasePage';
import { BookModel } from '../../models/BookModel';
import { LivroServiceProvider } from '../../providers/livro-service/livro-service';
import { Camera } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-modal-create-book',
  templateUrl: 'modal-create-book.html',
})
export class ModalCreateBookPage extends BasePage{

  createBookFrmGroup: FormGroup;
  submitAttemp: boolean = false;
  bookModel: BookModel;
  imageThumb: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private camera: Camera,
    private viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public livroService: LivroServiceProvider,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    loadingCtrl: LoadingController) {
      super(loadingCtrl, alertCtrl, toastCtrl);

      this.bookModel = new BookModel();
      this.bookModel.disponivelParaEmprestimo = true;

      this.createBookFrmGroup = formBuilder.group({
        titulo: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
        editora: ['', Validators.compose([Validators.required, Validators.maxLength(45)])],
        dataDaPublicacao: ['', Validators.compose([Validators.required])],
        descricao: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
        autor: ['', Validators.required],
        disponivelParaEmprestimo: ['', Validators.compose([Validators.required])],
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalCreateBookPage');
  }

  createBook(){
    this.submitAttemp = true;
    
    if(!this.imageThumb){
      return;
    }

    if(!this.createBookFrmGroup.valid){
      return;
    }

    this.showLoading('Carregando...');

    this.livroService.createBook(this.bookModel, this.imageThumb).subscribe(resp => {
      this.hideLoading();
      this.showToast('Livro cadastrado com sucesso!');

      this.viewCtrl.dismiss({
        created: true
      });

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

  takePicture(sourceType){
    this.camera.getPicture({
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: false,
      targetWidth: 1000,
      targetHeight: 1000
    }).then(
      (image) => {
        this.imageThumb = image;        
      },
      (erro) => {
        this.showToast(erro);
      }
    );
  }

  presentActionSheetThumb(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Selecionar Imagem',
      buttons: [
        {
          text: 'Câmera',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },{
          text: 'Galeria',
          icon: !this.platform.is('ios') ? 'images' : null,
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.SAVEDPHOTOALBUM);
          }
        }
      ]
    });
    actionSheet.present();
  }

  cleanForm(){
    this.submitAttemp = false;
    this.createBookFrmGroup.reset();
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
