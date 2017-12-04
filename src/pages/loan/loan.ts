import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController} from 'ionic-angular';
import { BasePage } from '../../estruturaBase/BasePage';
import { LoanModel } from '../../models/LoanModel';
import { EmprestimoServiceProvider } from '../../providers/emprestimo-service/emprestimo-service';

/**
 * Generated class for the LoanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loan',
  templateUrl: 'loan.html',
})
export class LoanPage extends BasePage{

  loans: LoanModel[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loanService: EmprestimoServiceProvider) {
      super(loadingCtrl, alertCtrl, toastCtrl);

      this.showLoading('Carregando...');
      this.getLoansUser();
  }

  getLoansUser(){
    this.loanService.getUserLoans().subscribe(
      (data) => {
        this.loans = data;
        this.hideLoading();
      }, (error) => {
        this.showAlert('Erro Empréstimos', 'Não foi possível consultar os empréstimos');
        this.hideLoading();
      }
    );
  }

  updateLoan(id, status){
    let confirm = this.alertCtrl.create({
      title: 'Dejesa realmente realizar esta operação?',
      message: '',
      buttons: [
        {
          text: 'Não',
          handler: () => {
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.showLoading('Carregando...')
            this.loanService.updateUserLoan(id, status).subscribe(
              data => {
                this.hideLoading();
                let resp = JSON.parse(JSON.stringify(data));
        
                if(resp.success){
                  this.showToast(resp.message);
                  this.getLoansUser();
                  return;
                }
                
                this.showAlert('Não foi possível editar o empréstimo', resp.message);
        
              }, error => {
                this.hideLoading();
                this.showAlert('Erro ao Editar', 'Não foi possível editar o empréstimo');
              }
            );
          }
        }
      ]
    });
    confirm.present();
  }

}
