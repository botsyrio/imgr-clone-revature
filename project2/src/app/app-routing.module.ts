
import { AlbumEditGuard } from './guards/albumEdit/album-edit.guard';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';
import { AlbumCreateComponent } from './album-create/album-create.component';
import { SearchResultPageComponent } from './search-result-page/search-result-page.component';
import { MyAlbumsComponent } from './my-albums/my-albums.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { AlbumViewComponent } from './album-view/album-view.component';
import { AlbumEditComponent } from './album-edit/album-edit.component';
import {RegistrationComponent} from "./registration/registration.component";
import { LoggedInGuard } from './guards/loggedIn/logged-in.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path:'', component: HomepageComponent},
  {path:'album/:id', component: AlbumViewComponent},
  {path:'album/:id/edit', component: AlbumEditComponent, canActivate: [AlbumEditGuard]},
  {path: 'register', component: RegistrationComponent},
  {path:'myAlbums', component: MyAlbumsComponent, canActivate: [LoggedInGuard]},
  {path:'search', component: SearchResultPageComponent},
  {path:'createAlbum', component: AlbumCreateComponent, canActivate: [LoggedInGuard]},
  {path:'myFavorites', component: MyFavoritesComponent, canActivate: [LoggedInGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
