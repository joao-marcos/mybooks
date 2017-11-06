import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { LoginModel } from '../../models/LoginModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BasePage } from '../../estruturaBase/BasePage';
import { CadastrarUsuarioPage } from '../cadastrar-usuario/cadastrar-usuario';
import { AutenticacaoServiceProvider } from '../../providers/autenticacao-service/autenticacao-service';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BasePage{

  loginFrmGroup: FormGroup;
  submitAttemp: boolean = false;
  loginModel: LoginModel;
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public autenticacaoService: AutenticacaoServiceProvider,
    public toastCtrl: ToastController,
    loadingCtrl: LoadingController
    ) {
      super(loadingCtrl, alertCtrl, toastCtrl);

      this.loginModel = new LoginModel();
      this.loginFrmGroup = formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        senha: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
      });

    }

  ionViewDidLoad(): void{
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    this.submitAttemp = true;
    
    if(!this.loginFrmGroup.valid){
      return;
    }
    
    this.showLoading('Realizando Login...');
    this.autenticacaoService.login(this.loginModel).subscribe(
      response => {
        this.hideLoading();
        this.navCtrl.setRoot(TabsPage, {}, {animate: true, direction: 'forward'});
      },
      error => {
        this.hideLoading();
        let response = JSON.parse(error._body);
        //this.showAlert('Erro login', error);
        for(var key in response.errors){
           let errorText =  response.errors[key].join(' ');
           this.showAlert(response.message, errorText);
        }
      }
    );

  }

  cadastrarUsuario(): void{
    this.navCtrl.push(CadastrarUsuarioPage, {}, {animate: true, direction: 'forward'});
  }

}
