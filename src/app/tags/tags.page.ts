import { Component, OnInit } from '@angular/core';
import { GetProviderService } from '../get-provider.service'
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.page.html',
  styleUrls: ['./tags.page.scss'],
})
export class TagsPage implements OnInit {


  arrayTags:any;

  constructor(public getServices:GetProviderService, private router: Router) { }

  ngOnInit() {


  }

  ionViewWillEnter(){
    console.log("test");

    this.getTags();
  }



  getTags() {
    this.getServices.getTags()
    .then(data => {
      this.arrayTags = data;
    });
  }
  getPostsWithSelectedTag(id:any) {
    this.getServices.getPostWithOneTag(id)
    .then(data => {
      //console.log(data);

    /*   let navigationExtras: NavigationExtras = {
        state: {
          data: data,
        }
      }; */

      /* this.router.navigate(['/selected-tag-posts', navigationExtras ]);
 */


      let mData = JSON.stringify(data);

      this.router.navigate(['/selected-tag-posts'],
      { queryParams: { data: mData }});

    });
  }

}
