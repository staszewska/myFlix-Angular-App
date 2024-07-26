import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

/** API URL that provides the data for the client app
 */
const apiUrl = 'https://movies-api-ms-b2173cbfa01b.herokuapp.com/';

/** local
 * database */
// const apiUrl = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  /**
   * User registration
   * this method sends user details to the server to register a user
   * @param userDetails
   * @returns Observable<any>
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log('Registering user with details: ', userDetails);
    //sends a POST request to the server with the user details
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * User login
   * @param userData
   * @returns Observable<any>
   */

  public userLogin(userData: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userData)
      .pipe(catchError(this.handleError));
  }

  /**
   * API call to get all Movies
   * @returns Observable<any>
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        //transforms the data into an observable
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * API call to get a single movie by title
   * @param title
   * @returns Observable<any>
   */
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * API call to get director by name
   * @param name
   * @returns Observable<any>
   */
  getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/directors/' + name, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * API call to get genre by name
   * @param name
   * @returns Observable<any>
   */
  getGenre(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genres/' + name, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * API call to get user
   * @param userId
   * @returns Observable<any>
   */
  getUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + userId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * get favorite movies for a user
   * @returns Observable<any>
   */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http
      .get(apiUrl + 'users/' + user.Name, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * add a movie to favorites Movies
   * @param movieId
   * @returns Observable<any>
   */
  addFavoriteMovie(movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(user);
    return this.http
      .put(apiUrl + 'users/' + user.Name + '/movies/' + movieId, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * delete a movie from favorite Movies
   * @param movieId
   * @returns Observable<any>
   */
  deleteFavoriteMovie(movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http
      .delete(apiUrl + 'users/' + user.Name + '/movies/' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * update user
   * @param userDetails
   * @returns Observable<any>
   */

  updateUser(userDetails: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    /**
     * the URL for the PUT request:
     * API URL ("apiUrl") +
     * the string "users" +
     * the Username property from "userDetails object";
     * the "userDetails" object is sent as the request body
     */
    const userId = user._id;
    userDetails['_id'] = userId;

    return this.http
      .put(apiUrl + 'users/' + userDetails.Name, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * delete user
   * @returns Observable<any>
   */
  deleteUser(): Observable<any> {
    //retrieves the value associated with the key user from the browser's
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + user.Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * handles HTTP errors
   * @param error
   * @returns error message
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      //client-side or network error
      console.error('Some error occurred:', error.error.message);
    } else {
      //backend returned an unsuccessful response code
      console.error(
        `Error status code ${error.status}`,
        `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
