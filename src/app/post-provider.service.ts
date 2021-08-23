import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { md5 } from './md5';
@Injectable({
  providedIn: 'root'
})
export class PostProviderService {


  url = '';
  constructor(public http:HttpClient) {



  }

  addPost(data:any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url, JSON.stringify(data))
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }

  LoginDetails(email:any, password:any){


    const formData = new FormData();

    console.log(email + " " + password);


   // const jsonString = JSON.stringify(mdata);
    formData.append('email', email);
    formData.append('password', md5(password));


    this.url = "http://localhost:8080/user_login";
    return new Promise((resolve, reject) => {
      this.http.post(this.url, formData)
        .subscribe(response => {
          console.log(response);

          resolve(JSON.stringify(response));
        }, (error) => {
          reject(error);
        });
    });
  }

  registerUser(email:any, password:any, user_name:any){

    const formData = new FormData();
    //console.log(email + " " + password);
    let hiddenPass= md5(password);

   // const jsonString = JSON.stringify(mdata);
    formData.append('email', email);
    formData.append('password', hiddenPass);
    formData.append('user_name', user_name);

    this.url = "http://localhost:8080/user_register";
    return new Promise((resolve, reject) => {
      this.http.post(this.url, formData)
        .subscribe(response => {
          console.log(response);

          resolve(JSON.stringify(response));
        }, (error) => {
          reject(error);
        });
    });
  }


  createPost(text:any, tag:any, image:any, identifier:any){

    const formData = new FormData();
    //console.log(email + " " + password);

   // const jsonString = JSON.stringify(mdata);
    formData.append('text', text);
    formData.append('tag_name', tag);
    formData.append('image', image);
    formData.append('identifier', identifier);


    console.log(image);

    this.url = "http://localhost:8080/add_post";
    return new Promise((resolve, reject) => {
      this.http.post(this.url, formData)
        .subscribe(response => {
          console.log(response);

          resolve(JSON.stringify(response));
        }, (error) => {
          reject(error);
        });
    });


  }

  editPost(text:any, tag:any, identifier:any, post_id:any){

    const formData = new FormData();
    //console.log(email + " " + password);

   // const jsonString = JSON.stringify(mdata);
    formData.append('new_text', text);
    formData.append('new_tag', tag);
    formData.append('identifier', identifier);
    formData.append('post_id', post_id)


    this.url = "http://localhost:8080/edit_post";
    return new Promise((resolve, reject) => {
      this.http.post(this.url, formData)
        .subscribe(response => {
          console.log(response);

          resolve(JSON.stringify(response));
        }, (error) => {
          reject(error);
        });
    });


  }

  deletePost(id:any, identifier:any){
    const formData = new FormData();
    formData.append('post_id', id)
    formData.append('identifier', identifier)

    this.url = "http://localhost:8080/delete_post";
    return new Promise((resolve, reject) => {
      this.http.post(this.url, formData)
        .subscribe(response => {
          console.log(response);

          resolve(JSON.stringify(response));
        }, (error) => {
          reject(error);
        });
    });

  }

  editUser(user_name:any, email:any, identifier:any){

    const formData = new FormData();
    //console.log(email + " " + password);

   // const jsonString = JSON.stringify(mdata);
    formData.append('user_name', user_name);
    formData.append('email', email);
    formData.append('identifier', identifier);



    this.url = "http://localhost:8080/edit_user";
    return new Promise((resolve, reject) => {
      this.http.post(this.url, formData)
        .subscribe(response => {
          console.log(response);

          resolve(JSON.stringify(response));
        }, (error) => {
          reject(error);
        });
    });


  }


}
