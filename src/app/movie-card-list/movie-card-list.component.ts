import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card-list',
  templateUrl: './movie-card-list.component.html',
  styleUrl: './movie-card-list.component.scss',
})
export class MovieCardListComponent {
  //movies returned from the API
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * function to get all movies from the API
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      //save all the movies to local storage
      localStorage.setItem('movies', JSON.stringify(resp));
      // console.log(this.movies);
    });
  }

  /**
   * Navigates to the user profile page
   */
  goToProfile(): void {
    this.router.navigate(['/profile']);
    // console.log('profile was clicked');
  }

  /**
   * Logs out the current user by navigating to the 'welcome' page
   * and removing the 'user' item from local storage.
   */
  logOut(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('user');
  }
}
