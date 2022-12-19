import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post, User } from '../interfeces';

@Injectable({ providedIn: 'root' })
export class UserService {
  user$ = new Subject<User>();
  post$ = new Subject<Post>();

  changeUser(user: User): void {
    this.user$.next(user);
  }
  updatePosts(posts: Post[], post: Post): void {
    const index = posts.indexOf(post);
    posts.splice(index, 1);
    this.post$.next(post);
  }
}
