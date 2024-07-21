import { Component, Input, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

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

  // function that will open the dialog when the genre button is clicked
  openGenreInfoDialog(movie: any): void {
    // console.log(movie);
    const genre = movie.Genre;
    console.log(genre);

    this.dialog.open(GenreInfoComponent, {
      width: '280px',
      data: { genre },
    });
  }

  // function that will open the dialog when the synopsis button is clicked
  openSynopsisDialog(movie: any): void {
    // console.log(movie);
    const synopsis = movie.Description;
    console.log(synopsis);

    this.dialog.open(SynopsisComponent, {
      width: '280px',
      data: { synopsis },
    });
  }
}
