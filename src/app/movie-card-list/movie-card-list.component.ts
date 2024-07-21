import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card-list',
  templateUrl: './movie-card-list.component.html',
  styleUrl: './movie-card-list.component.scss',
})
export class MovieCardListComponent {
  //movies returned from the API
  movies: any[] = [];

  constructor(public fetchApiData: FetchApiDataService) {}

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
