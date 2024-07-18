import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly dialog = inject(MatDialog);
  title = 'myFlix-Angular-v2';

  openUserRegistrationDialog(): void {
    const dialogRef = this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log(`Dialog closed`);
    });
  }

  openUserLoginDialog(): void {
    const dialogRef = this.dialog.open(UserLoginFormComponent, {
      // Assigning the dialog a width
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log(`Dialog closed`);
    });
  }

  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      // width: '500px',
    });
  }
}
