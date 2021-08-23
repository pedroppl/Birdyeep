import { Component } from '@angular/core';
import { GetProviderService } from '../get-provider.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  arrayPosts:any;
  urlImage:any;
  constructor(public getServices:GetProviderService, private router:Router) {



    this.urlImage = "http://localhost:8888/BirdyeepBD/SlimBird/app/images/";

  }


  async ionViewWillEnter(){


    this.getPosts();
  }

  getPosts() { //llamamos a la funcion getPost de nuestro servicio.
    this.getServices.getPosts()
    .then(data => {

      console.log(data);

      this.arrayPosts = data;
    });
  }

  navigateToCreatePost(){
    this.router.navigate(['/create-post']);
  }

}
