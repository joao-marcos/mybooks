import { AlertController, LoadingController, Loading } from 'ionic-angular';

export class BasePage{
    loadingCtrl: LoadingController;
    loading: Loading;
    alertCtrl: AlertController;

    constructor(loadingCtrl: LoadingController, alertCtrl: AlertController){
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
    }

    showLoading(msg: string, duracao: number = 0){
        if(duracao == 0){
            this.loading  = this.loadingCtrl.create({
            content: msg,
            });
        }else{
            this.loading = this.loadingCtrl.create({
            content: msg,
            duration: duracao
            });
        }
        this.loading.present();
    }
    
    hideLoading(){
        if(this.loading != null){
            this.loading.dismiss();
        }
    }

    showAlert(title: string, subTitle: string){
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
        });

        alert.present();
    }

}