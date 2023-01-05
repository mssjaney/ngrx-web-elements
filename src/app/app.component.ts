import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Post } from './models/post.model';
import * as PostActions from './actions/post.actions';

interface AppState {
  message: string;
}

interface PostState {
  post: Post;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngrxFire';

  message$: Observable<string>

  post$: Observable<Post>

  text: string = "";

  constructor(
    private store: Store<AppState>,
    private postStore: Store<PostState>
  ) {
    this.message$ = this.store.select('message');

    this.post$ = this.postStore.select('post');
  }

  spanishMessage() {
    this.store.dispatch({type: 'SPANISH'})
  }

  frenchMessage() {
    this.store.dispatch({type: 'FRENCH'})
  }

  editText() {
    this.postStore.dispatch(new PostActions.EditText(this.text))
  }

  resetPost() {
    this.postStore.dispatch(new PostActions.Reset())
  }

  upvote() {
    this.postStore.dispatch(new PostActions.Upvote())
  }

  downvote() {
    this.postStore.dispatch(new PostActions.Downvote())
  }
}
