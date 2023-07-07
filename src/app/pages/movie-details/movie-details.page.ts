import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FavouriteService } from 'src/app/services/favourite.service';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie: any = null;
  imageBaseUrl = environment.images;

  isFavourite = false;
  private _filmId: any;
  public get filmId() {
    return this._filmId;
  }
  public set filmId(value) {
    this._filmId = value;
  }

  constructor(private route: ActivatedRoute, private movieService: MovieService, private favouriteService: FavouriteService) { }

  ngOnInit() {
    /*
    const id = this.route.snapshot.paramMap.get('id');
    if (id) { // to prevent null type error
      this.movieService.getMovieDetails(id).subscribe((res) => {
        console.log(res);
        this.movie = res;
      });
    }
    */
    this.filmId = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetails(this.filmId).subscribe((res) => {
      console.log(res);
      this.movie = res;
    });
    this.favouriteService.isFavourite(this.filmId).then(isFav => {
      this.isFavourite = isFav;
    });
  }
  favouriteFilm() {
    this.favouriteService.favouriteFilm(this.filmId).then(() => {
      this.isFavourite = true;
    });
  }
  unfavouriteFilm() {
    this.favouriteService.unfavouriteFilm(this.filmId).then(() => {
      this.isFavourite = false;
    });
  }

  openHomepage() {
    window.open(this.movie.homepage)
  }
}
