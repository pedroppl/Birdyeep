import { Component, OnInit } from '@angular/core';
import { PostProviderService } from '../post-provider.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {


  mText:any;
  tag_name:any;
  mImage:any;
  userIdentifier
  _storage:any;
  file:any;
  isEditMode:boolean = false;

  editData:any

  constructor(private router:Router, public postService:PostProviderService, private storage: Storage, private route: ActivatedRoute) {


    this._storage = storage

    try {
      this.route.queryParams.subscribe(
        params => {

           this.editData = JSON.parse(params['data']);
           this.isEditMode = this.editData[0]['refresh'];

           let newString = "";
          if(this.editData[0]['text'].includes(' ---Third') || this.editData[0]['text'].includes(' ---Fifth') ){

            newString = this.editData[0]['text'].split(' ---Third message---')[0];

          }else{
            newString = this.editData[0]['text'];
          }

          this.mText = newString;
          this.tag_name = this.editData[0]['tag'];

        }
      )
    } catch (error) {
      console.log("error");

    }

  }

  ngOnInit() {
  }

  ionViewWillEnter(){


  }

  changeListener($event) : void {
    this.file = $event.target.files[0];
    console.log(this.file);
  }

  async createOrEditPost(){
    //get all the data from inputs

    //get the image from the input

    //conect with the php server.

    //if message = ok -> close page and go back

    //else -> error

    if(this.isEditMode === true){

      console.log(this.isEditMode);


      this.userIdentifier = await this._storage.get('user_id');

      if(this.tag_name == ""){
        console.log('eeee');

      }


        this.postService.editPost(this.mText, this.tag_name, this.userIdentifier, this.editData[0]['id'])
        .then(async data => {

          let mArray:any = [{refresh:true}];

          let mData = JSON.stringify(mArray);

          this.router.navigate(['/tabs/user-posts'],
            { queryParams: { data: mData } });


        });
    }else{
      this.userIdentifier = await this._storage.get('user_id');

      console.log("inserting");


        this.postService.createPost(this.mText, this.tag_name, this.file, this.userIdentifier)
        .then(async data => {
          let mArray:any = [{refresh:false}];

          let mData = JSON.stringify(mArray);

          this.router.navigate(['/tabs/user-posts'],
            { queryParams: { data: mData } });
        });
    }



  }



}
