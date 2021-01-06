import { HomepageComponent } from './homepage/homepage.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './services/InMemoryData/in-memory-data.service';

import { AlbumEditComponent } from './album-edit/album-edit.component';
import { AlbumViewComponent } from './album-view/album-view.component';

import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { UpvoteComponent } from './upvote/upvote.component';
import { RegistrationComponent } from './registration/registration.component';
import { CommentsComponent } from './comments/comments.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AlbumTileComponent } from './album-tile/album-tile.component';
import { MyAlbumsComponent } from './my-albums/my-albums.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResultPageComponent } from './search-result-page/search-result-page.component';
import { AlbumCreateComponent } from './album-create/album-create.component';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { LikeComponent } from './like/like.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumEditComponent,
    AlbumViewComponent,
    LoginComponent,
    HomepageComponent,
    UpvoteComponent,
    RegistrationComponent,
    CommentsComponent,
    NavbarComponent,
    AlbumTileComponent,
    MyAlbumsComponent,
    SearchBarComponent,
    SearchResultPageComponent,
    AlbumCreateComponent,
    MyFavoritesComponent,
    FavoriteComponent,
    LikeComponent
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, {dataEncapsulation: false}
    // ),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
