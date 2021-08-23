import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectedTagPostsPage } from './selected-tag-posts.page';

const routes: Routes = [
  {
    path: '',
    component: SelectedTagPostsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectedTagPostsPageRoutingModule {}
