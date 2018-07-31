import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from './redux/app.state';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { LoadCars, AddCar, DeleteCar, UpdateCar } from './redux/cars.action';
import { Car } from '../app/car.model';

@Injectable()
export class CarsService {
  static BASE_URL = 'http://localhost:3000/';

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  preloadCars() {
    return this.http.get(CarsService.BASE_URL + 'cars');
  }

  loadCars(): void {
    this.preloadCars()
      .toPromise()
      .then((cars: any) => this.store.dispatch(new LoadCars(cars)));
  }

  addCar(car: Car) {
    this.http.post(CarsService.BASE_URL + 'cars', car)
      .toPromise()
      .then((c: Car) => {
        this.store.dispatch(new AddCar(c));
      });
  }

  deleteCar(car: Car) {
    this.http.delete(CarsService.BASE_URL + 'cars/' + car.id)
      .toPromise()
      .then((c: Car) => {
        this.store.dispatch(new DeleteCar(car));
      });
  }

  updateCar(car: Car) {
    this.http.put(CarsService.BASE_URL + 'cars/' + car.id, car)
      .toPromise()
      .then((car: Car) => {
        this.store.dispatch(new UpdateCar(car));
      });
  }

}
