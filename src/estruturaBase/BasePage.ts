import { AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';

export class BasePage{
    loadingCtrl: LoadingController;
    loading: Loading;
    alertCtrl: AlertController;
    toastCtrl: ToastController;

    constructor(loadingCtrl: LoadingController, alertCtrl: AlertController, toastCtrl: ToastController){
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
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

    showToast(message: string, duration: number = null, position: string = null){
        let toast = this.toastCtrl.create({
            message: message,
            duration: (duration == null) ? 3000 : duration,
            position: (position == null) ? 'bottom' : position
          });
          toast.present();
    }

}