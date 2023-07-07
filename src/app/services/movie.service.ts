import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ApiResult {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovies(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(
      // https://developer.themoviedb.org/reference/movie-popular-list
      // https://developer.themoviedb.org/reference/movie-upcoming-list
      `${environment.baseUrl}/movie/upcoming?api_key=${environment.apiKey}&page=${page}` // note `` not '' as it accepts dynamic variables ${}
      );
  }

  getMovieDetails(id: string) {
    return this.http.get(
      // https://developer.themoviedb.org/reference/movie-details
      `${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`
      );
  }

}
