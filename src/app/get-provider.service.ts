import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetProviderService {

  urlGlobal = 'http://localhost:8080/';

  constructor(public http: HttpClient) {




  }




  getPosts(){
    return new Promise(resolve=>{
      this.http.get(this.urlGlobal + "user_posts").subscribe(data=>{
          resolve(data);
      },error=>{
        console.log(error);
      });
    });
  }

  getUserPosts(id:any){

    return new Promise(resolve=>{
      this.http.get(this.urlGlobal + "user_posts/"+id).subscribe(data=>{
        console.log(data);

          resolve(data);
      },error=>{
        console.log(error);
      });
    });
  }


  getTags(){
    return new Promise(resolve=>{
      this.http.get(this.urlGlobal + "tags").subscribe(data=>{
          resolve(data);
      },error=>{
        console.log(error);
      });
    });
  }


  getPostWithOneTag(id_tag:any){

    return new Promise(resolve=>{
      this.http.get(this.urlGlobal + "posts_with_a_tag/"+id_tag).subscribe(data=>{
          resolve(data);
      },error=>{
        console.log(error);
      });
    });
  }

  getUserDetails(id:any){

    return new Promise(resolve=>{
      this.http.get(this.urlGlobal + "get_user_details/"+id).subscribe(data=>{
        console.log(data);

          resolve(data);
      },error=>{
        console.log(error);
      });
    });
  }





}
