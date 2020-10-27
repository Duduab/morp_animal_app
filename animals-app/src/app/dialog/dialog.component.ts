import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AnimalsService } from '../animals.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    private completeMessage: MatSnackBar,
    private service: AnimalsService,
    private fb: FormBuilder)
    { }

  ngOnInit(): void {
  }

  userForm = this.fb.group({
    type: ['', Validators.required],
    color: ['', Validators.required],
    weight: ['', Validators.required],
    length: ['', Validators.required]
  });

  addNewAnimal() {
    try {
      this.service.addAnimal(this.userForm.value);

      const success = 'Your ' + this.userForm.value.type + ' Added Successfully'
      console.log(this.userForm.value.type);
      this.completeMessage.open(success, 'Close', {
        duration: 1500,
      });
    }
    catch {
      const error = 'Error Occured while trying add this Animal';
      this.completeMessage.open(error , 'Close', {
        duration: 1500,
      });
    }
  }

}
