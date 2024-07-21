import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MatCardModule } from '@angular/material/card';
import { provideHttpClient } from '@angular/common/http';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card-list/movie-card-list.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RouterModule, Routes } from '@angular/router';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { MatToolbarModule } from '@angular/material/toolbar';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { DirectorInfoComponent } from './director-info/director-info.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: ProfileViewComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'prefix' },
];
@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    ProfileViewComponent,
    DirectorInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [provideAnimationsAsync(), provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
