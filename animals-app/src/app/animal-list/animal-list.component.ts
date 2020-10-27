import { Component , OnInit } from '@angular/core';
import { AnimalsService } from '../animals.service';
import { Animal } from '../animal.interface';
import { map, startWith } from 'rxjs/operators'
import {  Subject, combineLatest } from 'rxjs';
import { animate } from '@angular/animations';


interface AnimalRow extends Animal {
  highlight: boolean
}

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit {
  titles = ['type', 'color', 'weight', 'length'];
  animals: AnimalRow[];
  step = false;
  counter = 0;
  animalSubject = new Subject<{animal: Animal, type: string}>();
  constructor(
    public service: AnimalsService
  ) { }

  ngOnInit(): void {
      combineLatest([
        this.service.getAllAnimals(),
        this.animalSubject.pipe(startWith(undefined))
      ])
        .pipe(
            map(([animals, clicked]) => {
              return animals.map(animal=> {
                const animalRow: AnimalRow = {
                  ...animal,
                  highlight: 
                    (clicked?.type === 'type' && clicked?.animal.type === animal.type) ||
                    (clicked?.type === 'color' && clicked?.animal.color === animal.color) ||
                    (clicked?.type === 'weight' && clicked?.animal.weight === animal.weight) ||
                    (clicked?.type === 'length' && clicked?.animal.length === animal.length)
                };    
                return animalRow;
              });
            })
        ).subscribe(animals => {
              this.animals = animals
              this.counter = this.animals.length 
        });  
        console.log(this.counter);  
    }

    handleClick(animal: Animal, type: string) {
      this.animalSubject.next({animal, type});
    }  

    changeValue(value: string) {
      this.service.selectedAttributes = value;
    }
   
}
