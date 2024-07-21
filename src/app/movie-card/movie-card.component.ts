import { Component, Input, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DirectorInfoComponent } from '../director-info/director-info.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input({ required: true }) movie!: any;

  constructor(public dialog: MatDialog) {}

  // function that will open the dialog when the director button is clicked
  openDirectorInfoDialog(movie: any): void {
    // console.log(movie);
    const director = movie.Director;
    console.log(director);

    this.dialog.open(DirectorInfoComponent, {
      width: '280px',
      data: { director },
    });
  }
}
