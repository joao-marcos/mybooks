import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { LoginModel } from '../../models/LoginModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginFrmGroup: FormGroup;
  submitAttemp: boolean = false;
  loginModel: LoginModel;
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public  formBuilder: FormBuilder
    ) {
      this.loginModel = new LoginModel();
      this.loginFrmGroup = formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        senha: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
      });

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    this.submitAttemp = true;
  }

}
