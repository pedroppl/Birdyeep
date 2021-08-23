import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProviderService } from '../post-provider.service'

import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  email: string = "";
  password: string = "";

  private _storage: Storage | null = null;
  constructor(private router:Router, public postService:PostProviderService, private storage: Storage) {
    this._storage = storage;
  }

  ngOnInit() {



  }



  ionViewWillEnter(){

    if(false){ //change this to check if the user is logged. We can check that adding a simple var to the localStorage.
      this.navigateToUser();
    }


  }


  navigateToUser(){
    this.router.navigate(['/tabs/user-posts']);
  }


  navigateToRegister(){
    this.router.navigate(['/register']);
  }


  login(){

    let inputData = {
      email: this.email,
      password: this.password,

    };

    console.log(inputData);



      this.postService.LoginDetails(inputData['email'], inputData['password'])
      .then(async data => {

        //add localstorage
        console.log(data);


        if(data['email']){
          console.log("nooooo");
        }else{
          let mData = JSON.parse(data.toString());

          await this._storage.set('user_id', mData[0]['identifier']);
          this.router.navigate(['/tabs/user-posts']);
        }






      });
    }






}
