import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from './redux/app.state';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { LoadCars, AddCar } from './redux/cars.action';
import { Car } from '../app/car.model';

@Injectable()
export class CarsService {
  static BASE_URL = 'http://localhost:3000/';

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  loadCars(): void {
    this.http.get(CarsService.BASE_URL + 'cars')
      .toPromise()
      .then((cars: any) => this.store.dispatch(new LoadCars(cars)));
  }

  addCar(car: Car) {
    this.http.post(CarsService.BASE_URL + 'cars', car)
      .toPromise()
      .then((car: Car) => {
        this.store.dispatch(new AddCar(car));
      });
  }

}
