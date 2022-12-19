import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { PostsPageComponent } from './posts-page/posts-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: 'posts/:idUser', component: PostsPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
