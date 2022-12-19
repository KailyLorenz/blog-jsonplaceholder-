import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../shared/services/post.service';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { Post, User, UserPost } from '../shared/interfeces';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pc-users-page',
  templateUrl: 'users-page.component.html',
  styleUrls: ['users-page.component.scss'],
})
export class UsersPageComponent implements OnInit, OnDestroy {
  users$!: Observable<UserPost[]>;
  usersPost!: UserPost[];
  postDeletedSub$!: Subscription;
  countPostsOfUser = new Map();
  constructor(
    private postService: PostService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initializeListeners();
  }

  initializeListeners(): void {
    this.postDeletedSub$ = this.userService.post$.subscribe((post: Post) => {
      if (post) {
        this.usersPost.map((user: UserPost) => {
          if (user.id === post.userId) {
            user.countPosts--;
          }
        });
      }
    });
    this.users$ = combineLatest([
      this.postService.getUsers(),
      this.postService.getPosts(),
    ]).pipe(
      map(([users, posts]) => {
        this.handleCountPosts(posts);
        this.usersPost = users.map((user) => {
          return { ...user, countPosts: this.countPostsOfUser.get(user.id) };
        });
        return this.usersPost;
      })
    );
  }
  handleCountPosts(posts: Post[]): void {
    posts.map((post: Post) => {
      if (this.countPostsOfUser.has(post.userId)) {
        this.countPostsOfUser.set(
          post.userId,
          this.countPostsOfUser.get(post.userId) + 1
        );
      } else {
        this.countPostsOfUser.set(post.userId, 1);
      }
    });
  }
  openPosts(user: User): void {
    this.userService.changeUser(user);
    this.router.navigate(['/posts', user.id]);
  }
  ngOnDestroy(): void {
    if (this.postDeletedSub$) {
      this.postDeletedSub$.unsubscribe();
    }
  }
}
