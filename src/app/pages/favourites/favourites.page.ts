import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { finalize, forkJoin } from 'rxjs';
import { FavouriteService } from 'src/app/services/favourite.service';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
    movies: any[] = [];
    imageBaseUrl = environment.images;
  
    constructor(
      private movieService: MovieService,
      private loadingCtrl: LoadingController,
      private favouriteService: FavouriteService
    ) {}
  
    ngOnInit() {
      this.loadMovies();
    }
  
    async loadMovies() {
      // this.movies = [];
      const loading = await this.loadingCtrl.create({
        message: 'Loading...',
        spinner: 'bubbles',
      });
      await loading.present();
  
      const favorites = await this.favouriteService.getAllFavouriteFilms();
      forkJoin<any[]>(favorites.map((id: any) => this.movieService.getMovieDetails(id)))
        .pipe(finalize(() => loading.dismiss()))
        .subscribe((movies) => {
          this.movies.push(...movies);
        });
        console.log(this.movies);
    }
  }