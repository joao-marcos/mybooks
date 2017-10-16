import { AlertController, LoadingController, Loading } from 'ionic-angular';

export class BasePage{
    loadingCtrl: LoadingController;
    loading: Loading;

    constructor(loadingCtrl: LoadingController){
        this.loadingCtrl = loadingCtrl;
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
}