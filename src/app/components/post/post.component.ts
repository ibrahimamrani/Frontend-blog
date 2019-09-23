import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{
 
  private getPostsSubscriber: Subscription;
  public posts: Post[];
  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.getPostsSubscriber = this.postService
      .getPosts()
      .subscribe(posts => {
        this.posts = posts;
      });
  }

}
