import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { CommentService } from 'src/app/services/comment.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  posteId : number;

  private getPostsSubscriber: Subscription;
  public comments: Comment[];
  constructor(
    private commentService: CommentService, 
    private router: Router, 
    private activeRoute: ActivatedRoute
    ) {}

  ngOnInit() {
    this.posteId = this.activeRoute.snapshot.params['posteId'];
    this.getAllComments(this.posteId);
  }

  getAllComments(postId: number): void {
    this.getPostsSubscriber = this.commentService
      .getComments(postId)
      .subscribe(comments => {
        this.comments = comments;
      });
  }


}
