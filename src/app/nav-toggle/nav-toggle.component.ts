import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../shared/interfeces';
import { UserService } from '../shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pc-nav-toggle',
  templateUrl: './nav-toggle.component.html',
  styleUrls: ['./nav-toggle.component.scss'],
})
export class NavToggleComponent implements OnInit, OnDestroy {
  userName!: string;
  userNameSub$!: Subscription;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues(): void {
    this.userNameSub$ = this.userService.user$.subscribe(
      (user: User) => (this.userName = user.name)
    );
  }
  ngOnDestroy(): void {
    if (this.userNameSub$) {
      this.userNameSub$.unsubscribe();
    }
  }
}
