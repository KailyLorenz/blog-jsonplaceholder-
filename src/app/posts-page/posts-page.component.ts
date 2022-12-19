import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../shared/interfeces';
import { PostService } from '../shared/services/post.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'pc-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss'],
})
export class PostsPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postsSub$!: Subscription;
  searchPost!: string;
  constructor(
    private route: ActivatedRoute,
    private postsService: PostService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.searchPost = '';
    this.postsSub$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['idUser']) {
            return this.postsService.getPostsOfUser(params['idUser']);
          } else {
            return this.postsService.getPosts();
          }
        })
      )
      .subscribe((res: Post[]) => {
        this.posts = res;
      });
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    post: Post
  ): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: post,
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result: Post) => {
      if (result) {
        this.userService.updatePosts(this.posts, result);
      }
    });
  }
  ngOnDestroy(): void {
    if (this.postsSub$) {
      this.postsSub$.unsubscribe();
    }
  }
}
