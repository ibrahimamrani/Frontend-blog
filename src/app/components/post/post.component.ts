import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  private getPostsSubscriber: Subscription;
  private getCommentSubscriber: Subscription;
  comments: Comment[] = new Array<Comment>();
  public posts: Post[];
  postData: { displayFields: boolean, postId: number } = { displayFields: false, postId: null };
  constructor(private postService: PostService, private commentService: CommentService) { }

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


  ngOnDestroy() {
    if (this.getPostsSubscriber) {
      this.getPostsSubscriber.unsubscribe();
    }
    if (this.getCommentSubscriber) {
      this.getCommentSubscriber.unsubscribe();
    }
  }
  getAllComments(postId: number): void {
    this.postData.displayFields = false;
    this.getCommentSubscriber = this.commentService
      .getComments(postId)
      .subscribe(comments => {
        this.comments = comments.map(comment => {
          comment.postId = postId;
          return comment;
        });
      });
  }

  setDisplayFields(postId: number): void {
    this.comments = [];
    this.postData.postId = postId;
    this.postData.displayFields = true;
  }
}
