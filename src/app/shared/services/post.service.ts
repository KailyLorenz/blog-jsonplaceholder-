import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post, User } from '../interfeces';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.url}/users`);
  }
  getPostsOfUser(idUser: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.url}/users/${idUser}/posts`);
  }
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.url}/posts`);
  }
  deletePost(post: Post): any {
    this.http.delete(`${environment.url}/posts/` + post.id);
  }
}
