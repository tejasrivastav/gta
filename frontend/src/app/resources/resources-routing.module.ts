import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PodcastComponent } from './podcast/podcast.component';

const routes: Routes = [
  { path: 'podcast', component: PodcastComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    PodcastComponent
  ]
})
export class ResourcesRoutingModule { }
