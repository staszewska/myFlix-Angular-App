import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss',
})
export class ProfileViewComponent {
  checkoutForm: any;
  favoriteMovies: any[] = [];
  filteredFavoriteMovies = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.checkoutForm = this.formBuilder.group({
      Name: '',
      Password: '',
      Email: '',
      Birthday: '',
    });
  }

  /**
   * Angular lifecycle hook that initializes the component.
   * Fetches the user's favorite movies when the component is loaded.
   */
  onSubmit(): void {
    console.log('Data submitted: ', this.checkoutForm.value);
    this.updateProfile(this.checkoutForm.value);
  }

  ngOnInit(): void {
    this.getFavoriteMovies();
  }

  /**
   * This method retrieves the user's favorite movies from the database
   */
  getFavoriteMovies(): void {
    const savedUser = localStorage.getItem('user');
    const userId = JSON.parse(savedUser)._id;

    const savedMovies = localStorage.getItem('movies');
    const movies = JSON.parse(savedMovies);
    // console.log(movies);

    this.fetchApiData.getUser(userId).subscribe((resp: any) => {
      this.favoriteMovies = resp.favoriteMovies;

      this.favoriteMovies.forEach((favoriteMovie) => {
        movies.forEach((movie) => {
          if (favoriteMovie === movie._id) {
            this.filteredFavoriteMovies.push(movie);
          }
        });
      });
    });
  }

  /**
   * Removes a movie from the filtered favorite movies list based on the provided movie ID.
   * @param movieId
   */
  onMovieRemoved(movieId: any): void {
    this.filteredFavoriteMovies = this.filteredFavoriteMovies.filter(
      //filter method creates a new array with all elements that pass test
      (movie) => movie._id !== movieId
    );
  }

  updateProfile(userDetails): void {
    this.fetchApiData.updateUser(userDetails).subscribe((response) => {
      // console.log('user has been updated: ', userDetails);
    });
  }

  backToMovies(): void {
    this.router.navigate(['/movies']);
  }

  logOut(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('user');
  }
}
