import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-book',
  templateUrl: 'book.html'
})
export class BookPage {

  constructor(
    public navCtrl: NavController, 
    private modalCtrl: ModalController,
  ) {

  }

  openModalCreateBook(){
    const myModal = this.modalCtrl.create('ModalCreateBookPage');
    myModal.present();

    myModal.onDidDismiss((data) => {
      console.log(data);
    })

  }

}
