import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss',
})
export class ProfileViewComponent {
  favoriteMovies: any[] = [];
  filteredFavoriteMovies = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFavoriteMovies();
  }

  //function to get all the favourite movies
  getFavoriteMovies(): void {
    const savedUser = localStorage.getItem('user');
    console.log(savedUser);
    const userId = JSON.parse(savedUser)._id;
    console.log(userId);

    const savedMovies = localStorage.getItem('movies');
    console.log(savedMovies);
    const movies = JSON.parse(savedMovies);
    console.log(movies);

    this.fetchApiData.getUser(userId).subscribe((resp: any) => {
      this.favoriteMovies = resp.favoriteMovies;

      this.favoriteMovies.forEach((favoriteMovie) => {
        movies.forEach((movie) => {
          if (favoriteMovie === movie._id) {
            this.filteredFavoriteMovies.push(movie);
          }
        });
      });

      console.log(this.filteredFavoriteMovies);

      // console.log(resp);
    });
  }

  backToMovies(): void {
    this.router.navigate(['/movies']);
  }
}
