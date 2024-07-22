import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  //input that comes from outside or parent component
  @Input({ required: true }) movie!: any;
  //emit an event the the movie is removed
  @Output() movieRemoved = new EventEmitter<any>();
  favoriteMovies: any[] = [];

  constructor(
    public dialog: MatDialog,
    private fetchApiData: FetchApiDataService
  ) {}

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

  //function that will add a movie to list of favorite movies
  addToFavorites(movieId: any): void {
    console.log(movieId);
    this.fetchApiData.addFavoriteMovie(movieId).subscribe((response) => {
      //find() searches through the array and returns the first element that satisfies the condition
      // this.favoriteMovies.push(
      //   this.movies.find((movie) => movie.id === movieId)
      // );

      console.log('Movie added to favorites');
      console.log('After adding movie successfully', response);
    });
  }

  //function that will remove a movie from the list of favorite movies
  removeFromFavorites(movieId: any): void {
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe((response) => {
      this.movieRemoved.emit(movieId);
      console.log('Movie deleted', response);
    });
  }
}
