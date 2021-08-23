import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-selected-tag-posts',
  templateUrl: './selected-tag-posts.page.html',
  styleUrls: ['./selected-tag-posts.page.scss'],
})
export class SelectedTagPostsPage implements OnInit {
//...
postsData: any;

sub:any
  constructor(private route: ActivatedRoute, private router: Router) {


    console.log(this.route.queryParams);

    this.route.queryParams.subscribe(
      params => {
         this.postsData = JSON.parse(params['data']);
      }
    )
  }

  ngOnInit() {





  }

}
