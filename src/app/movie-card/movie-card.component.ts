import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DirectorInfoComponent } from '../director-info/director-info.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  //movies returned from the API
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
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

  ngOnInit(): void {
    this.getMovies();
  }

  //function to get all movies from the API
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      //save all the movies to local storage
      localStorage.setItem('movies', JSON.stringify(resp));
      console.log(this.movies);
      // return this.movies;
    });
  }
}
