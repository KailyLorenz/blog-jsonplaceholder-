import {Pipe, PipeTransform} from "@angular/core";
import {Post} from "../interfeces";

@Pipe({
  name: 'searchPosts',
})
export class SearchPipe implements PipeTransform {
  transform(posts: Post[], search = ''): Post[] {
    if (!search.trim()) {
      return posts;
    }
    return posts.filter((post: Post) => {
      return post.title.toLowerCase().includes(search.toLowerCase());
    });
  }
}
