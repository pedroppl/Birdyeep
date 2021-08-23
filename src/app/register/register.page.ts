import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { PostProviderService } from '../post-provider.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {



  email: string = "";
  user_name:string = "";
  password: string = "";

  private _storage: Storage | null = null;

  constructor(private router:Router, public postService:PostProviderService, private storage: Storage) {



    this._storage = storage;

  }

  ngOnInit() {
  }




  navigateToUser(){

    this.router.navigate(['/tabs/user-posts']);


  }

  navigateToLogin(){

    this.router.navigate(['/home']);


  }


  register(){

    let inputData = {
      email: this.email,
      password: this.password,
      user_name: this.user_name

    };

    console.log(inputData);



      this.postService.registerUser(inputData['email'], inputData['password'], inputData['user_name'])
      .then(async data => {

        //add localstorage
        console.log("identifier= "+data);


        if(data['email']){
          console.log("nooooo");
        }else{
          let mData = JSON.parse(data.toString());

          await this._storage.set('user_id', mData);
         this.navigateToUser();
        }






      });
    }






}
