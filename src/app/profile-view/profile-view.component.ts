import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
// import { CartService } from '../cart.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss',
})
export class ProfileViewComponent {
  // items = this.cartService.getItems();
  checkoutForm: any;

  favoriteMovies: any[] = [];
  filteredFavoriteMovies = [];
  // @Input({ required: true }) userDetails: any;

  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router,
    // private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.checkoutForm = this.formBuilder.group({
      Name: '',
      Password: '',
      Email: '',
      Birthday: '',
    });
  }

  onSubmit(): void {
    // this.items = this.cartService.clearCart();
    console.log('Data submitted: ', this.checkoutForm.value);
    this.updateProfile(this.checkoutForm.value);
    // this.checkoutForm.reset();
  }

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

  onMovieRemoved(movieId: any): void {
    this.filteredFavoriteMovies = this.filteredFavoriteMovies.filter(
      //filter method creates a new array with all elements that pass test
      (movie) => movie._id !== movieId
    );
  }

  updateProfile(userDetails): void {
    this.fetchApiData.updateUser(userDetails).subscribe((response) => {
      console.log('user has been updated: ', userDetails);
    });
  }

  backToMovies(): void {
    this.router.navigate(['/movies']);
  }
}
