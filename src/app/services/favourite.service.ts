import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
const STORAGE_KEY = 'favouriteFilms';
@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  constructor(private storage: Storage) { }
  getAllFavouriteFilms() {
    return this.storage.create().then(() => { // needed
      return this.storage.get(STORAGE_KEY);
    });
  }
  isFavourite(filmId: any) {
    return this.getAllFavouriteFilms().then(result => {
      return result && result.indexOf(filmId) !== -1;
    });
  }
  favouriteFilm(filmId: any) {
    return this.getAllFavouriteFilms().then(result => {
      if (result) {
        result.push(filmId);
        return this.storage.set(STORAGE_KEY, result);
      } else {
        return this.storage.set(STORAGE_KEY, [filmId]);
      }
    });
  }
  unfavouriteFilm(filmId: any) {
    return this.getAllFavouriteFilms().then(result => {
      if (result) {
        var index = result.indexOf(filmId);
        result.splice(index, 1);
        return this.storage.set(STORAGE_KEY, result);
      }
      return null;
    });
  }
}