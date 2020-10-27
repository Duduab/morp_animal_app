import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Animal } from './animal.interface';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

  animals$ = new BehaviorSubject<Animal[]>([]);
  selectedAttributes: string;
  isFirstCall = true;

  constructor(
    private readonly http: HttpClient
  ) { }

  getAllAnimals(): Observable<Animal[]> {
    if ( this.isFirstCall ) {
      this.http
        .get<Animal[]>('http://localhost:3000/getAnimalsList')
        .pipe(
          take(1)
        )
        .toPromise()
        .then(animals => {
          if ( this.isFirstCall ) {
            this.animals$.next(animals)
            this.isFirstCall = false;
          }
        });      
    } 
    return this.animals$.asObservable();
  }

  addAnimal(animal: Animal) {
    this.animals$.next([
      ...this.animals$.value,
      animal,
    ])
  }
}
 