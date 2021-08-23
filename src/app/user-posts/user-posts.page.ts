import { Component, OnInit } from '@angular/core';
import { GetProviderService } from '../get-provider.service'
import { Storage } from '@ionic/storage-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { PostProviderService } from '../post-provider.service'
@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.page.html',
  styleUrls: ['./user-posts.page.scss'],
})
export class UserPostsPage implements OnInit {
  arrayPosts:any;
  tagsArray:any;
  _storage : any;
  noPosts:any;
  urlImage: string;
  refresh:boolean;
  userId:any;
  constructor(public getServices:GetProviderService, public postService:PostProviderService, private storage: Storage, private router:Router, private route: ActivatedRoute) {
/*

    this.arrayPosts = [{
      text: 'my title 1',
      user: 'kiran',
      name: 'official'
    },
   {
      text: 'my title 2',
      user: 'john',
      name: 'love',
      image: '../assets/bird.jpg'
    },{
      text: 'my title 3',
      user: 'Frank',
      name: 'cooking'
    },
  ];

  this.tagsArray = [{
      title: 'love',
      numPosts: '45'
    },
    {
      title: 'official',
      numPosts: '1'
    },
    {
      title: 'cooking',
      numPosts: '39'
  }];


*/

    console.log("test");

    this.route.queryParams.subscribe(
      params => {
      //this.refresh = true;
      console.log(params);

      this.refresh = JSON.parse(params['data']);
    console.log();

      // this.arrayPosts = "";
      if(this.refresh[0]['refresh']){

        this.getUserPosts();
      }

    }
    )






    this._storage = storage;
    this.urlImage = "http://localhost:8888/BirdyeepBD/SlimBird/app/images/";
   }

  ngOnInit() {


    //console.log("HOLAAA"+this._storage.get('user_id'));


  }

  async ionViewWillEnter(){
    console.log("test");

    this.route.queryParams.subscribe(
      params => {
       //this.refresh = true;
       console.log(params);

       this.refresh = JSON.parse(params['data']);
console.log();

       // this.arrayPosts = "";
       if(this.refresh[0]['refresh']){

         this.getUserPosts();
       }else{
        this.getUserPosts();
       }

     }
   )



    //let id = this._storage.get('user_id'); //get the id from the storage

    const id = await this._storage.get('user_id');


    console.log("entro!");

    this.getUserPosts();
  }
/*
  showTagData(tagName:any){
    let result;
    try{
      //console.log(tagName);
      let index = this.tagsArray.findIndex(i => i.title === tagName)
       result = this.tagsArray[index].numPosts;
    }catch(e){

      result = "error";

    }


    return result;

  }
*/

  async getUserPosts() { //llamamos a la funcion getPost de nuestro servicio.


    const id = await this._storage.get('user_id');
    console.log("executing");

    this.getServices.getUserPosts(id)
    .then(data => {

      console.log(data);


      if(data =="empty"){
        this.noPosts = true;
      }

      this.arrayPosts = data;

      console.log(this.arrayPosts);

    });
  }


  async deleteUserPosts(id:any){
    const identifier = await this._storage.get('user_id');
    this.postService.deletePost(id, identifier)
    .then(async data => {
      this.getUserPosts();
    });
  }

  navigateToCreatePost(){



    let mArray = [{
      refresh:false,

    }]

    let mData = JSON.stringify(mArray);

    this.router.navigate(['/create-post'],
      { queryParams: { data: mData } });




    }


  navigateToEditPost(id:any, text:any, tag:any){

    let mArray = [{
      id:id,
      text:text,
      tag:tag,
      refresh: true
    }]

    let mData = JSON.stringify(mArray);

    this.router.navigate(['/create-post'],
      { queryParams: { data: mData } });

    }




}
