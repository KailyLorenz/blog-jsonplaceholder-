import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Post } from '../shared/interfeces';
import { PostService } from '../shared/services/post.service';

@Component({
  selector: 'pc-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post,
    private postService: PostService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  removePost(): void {
    this.postService.deletePost(this.data);
    this.dialogRef.close(this.data);
  }
}
