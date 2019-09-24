import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { CommentService } from 'src/app/services/comment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {


  posteId: number;
  @Input() comments: Comment[];
  @Input() postData: { displayFields: boolean, postId: number };
  getCommentSubscriber: Subscription;
  comment: Comment = new Comment();
  constructor(
    private commentService: CommentService
  ) { }

  ngOnInit() {
  }
  createComment(): void {
    this.getCommentSubscriber = this.commentService
      .createComment(this.postData.postId, this.comment)
      .subscribe(id => {
        this.comments.push({
          ...this.comment,
          id,
          creationDate: new Date()
        });
        this.postData.displayFields = false;
        this.comment.author = "";
        this.comment.content = "";
      });
  }
  ngOnDestroy(): void {
    if (this.getCommentSubscriber) {
      this.getCommentSubscriber.unsubscribe();
    }
  }
}
