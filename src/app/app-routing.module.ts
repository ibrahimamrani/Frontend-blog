import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentComponent } from './components/comment/comment.component';
import { PostComponent } from './components/post/post.component';

const routes: Routes = [
  { path: 'comment/:posteId', component:  CommentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
