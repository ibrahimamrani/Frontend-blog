import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { Comment } from 'src/app/models/comment';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  private getPostsSubscriber: Subscription;
  private getCommentSubscriber: Subscription;
  comments: Comment[] = new Array<Comment>();
  comment: Comment = new Comment();
  public posts: Post[];
  
  displayFields: boolean ;
  displayCommentButton: boolean ;
  displayContentField: boolean ;
  constructor(private postService: PostService) { }

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
    this.displayFields = false;
    this.displayContentField = false;
    this.displayCommentButton = true;
    this.comment.postId = postId;
    this.getCommentSubscriber = this.postService
      .getComments(postId)
      .subscribe(comments => {
        this.comments = comments.map(comment => {
          return comment;
        });
      });
  }

  isSelectedPost(posteId: number): string{

    if(this.comment.postId === posteId){
      return "card-title-select";
    }else{
      return "card-title";
    }
  }

  createComment(): void {
    if(this.comment.author != null && this.comment.author != '' && this.comment.content != null && this.comment.content != '' ){
        this.getCommentSubscriber = this.postService
          .createComment(this.comment)
          .subscribe(id => {
            this.displayFields = false;
            this.getAllComments(this.comment.postId);
          });
    }else{
      alert('Auteur et contenu obligatoire !!');
    }
    
  }

  updateComment(): void {
    if(this.comment.content != null && this.comment.content != '' ){
      this.getCommentSubscriber = this.postService
          .updateComment(this.comment)
          .subscribe(id => {
            this.displayFields = false;
            this.getAllComments(this.comment.postId);
          });
    }else{
      alert('Contenu obligatoire !!');
    }
    
  }

  setDisplayFields(postId: number): void {
    this.comments = [];
    this.comment.postId = postId;
    this.comment.author = null;
    this.comment.content = null;
    this.displayFields = true;
  }

  deleteComment(commentId: number, posteId: number): void {
    this.getCommentSubscriber = this.postService
          .deleteComment(commentId)
          .subscribe(id => {
            this.displayFields = false;
            this.displayContentField = false;
            this.getAllComments(this.comment.postId);
          });
  }

  setDisplayContentField(commentContent: string, commentId: number, postId: number): void{
    this.displayContentField = true;
    this.displayCommentButton = false;
    this.comment.content = commentContent;
    this.comment.id = commentId;
    this.comment.postId = postId;
  }

}
