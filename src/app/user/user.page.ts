import { Component, OnInit } from '@angular/core';
import { GetProviderService } from '../get-provider.service'
import { PostProviderService } from '../post-provider.service'
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  arrayPosts:any;
  tagsArray:any;

  user_name:any
  email:any;
  _storage:any
  constructor(public getServices:GetProviderService, public postService:PostProviderService,  private storage:Storage, public toastController: ToastController) {


    this._storage = storage;
    this.getUserDetails();
  }
  ngOnInit() {




  }


   ionViewWillEnter(){

    this.getUserDetails();

  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Profile updated.',
      duration: 2000
    });
    toast.present();
  }

  async getUserDetails() { //llamamos a la funcion getPost de nuestro servicio.
    const identifier = await this._storage.get('user_id');
    console.log(identifier);

    this.getServices.getUserDetails(identifier)
    .then(data => {

      console.log(data);

      this.user_name = data[0]['user_name']
      this.email = data[0]['email']
    });
  }


  async editUser(){
    const identifier = await this._storage.get('user_id');
    this.postService.editUser(this.user_name, this.email, identifier)
    .then(async data => {


      console.log("all right");
      this.presentToast();
      this.getUserDetails();
    });
  }


}
