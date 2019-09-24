import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from '../models/comment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url = 'http://localhost:8080/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url, httpOptions);
  }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url + '/' + postId + '/comments', httpOptions);
  }

  createComment(comment: Comment): Observable<Number> {
    return this.http.post<Number>(
      this.url + '/' + comment.postId + '/comments',
      comment,
      httpOptions
    );
  }
    
  updateComment(commentId: number, content: String): Observable<void> {
    return this.http.put<void>(
      this.url + '/posts/comments/' + commentId + '/' + content ,
      httpOptions
    );
  }

  deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>(
      this.url + '/posts/comments/{id}',
      httpOptions
    );
  }
  
}
