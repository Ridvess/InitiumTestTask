import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FetchDataService} from "../../Services/fetch-data.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, tap} from "rxjs/operators";
import {async} from "rxjs";

//Interface that describes person model so that we can use it as a type later
interface personInt {
  name: string,
  surname: string,
  email: string,
  phone?: string
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  tempArr: personInt[] = [];
  toggleButton: boolean = false;
  ngOnInit() {
    if (localStorage.getItem('peopleArray') === null) {
      this.fetchDataService.getPersonData().subscribe(data => {
        localStorage.setItem('peopleArray', JSON.stringify(data))
        JSON.parse(localStorage.getItem('peopleArray') || '{}')
          .users.forEach((person: personInt, index: number) => {
          this.addRow();
          this.setDefaultPeople(person.name, person.surname, person.email, person.phone, index)
        });
      })
    }

    this.form = this.fb.group({
      personDataArr: this.fb.array([])
    })

    const retrievedPeople = JSON.parse(localStorage.getItem('peopleArray') || '{}');

    retrievedPeople.users.forEach((person: personInt, index: number) => {
      this.addRow();
      this.setDefaultPeople(person.name, person.surname, person.email, person.phone, index)
    })
  }

  form = this.fb.group({
    personDataArr: this.fb.array([])
  })

  constructor(private fetchDataService: FetchDataService, private fb: FormBuilder) {
  }

  get personDataArr() {
    return this.form.controls["personDataArr"] as FormArray
  }

  get fullName() {
    return this.form.controls["personDataArr"].get('fullName')
  }


  newRow(): FormGroup {
    return this.fb.group({
      checkbox: new FormControl(false),
      fullName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(2),]
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(255),]
      }),
      phone: new FormControl(null, {
        validators: []
      })
    })
  }

  addRow() {
    this.personDataArr.push(this.newRow())
  }

  removeRow(i: number) {
    this.personDataArr.removeAt(i)
  }

  setDefaultPeople(name = '', surname = '', email = '', phone = '', i = 0) {
    this.personDataArr.at(i).patchValue({
      fullName: `${name} ${surname}`,
      email: email,
      phone: phone,
    })
  }

  saveNewPerson(i: number) {
    this.tempArr = [];
    let personToPush: personInt = {name: '', surname: '', email: '', phone: ''}
    let retrievedPeople = JSON.parse(localStorage.getItem('peopleArray') || '{}');

    retrievedPeople.users.forEach( (val: personInt) =>
      this.tempArr.push(val)
    )

    let names: string[] = this.personDataArr.at(i).value.fullName.split(' ')
    personToPush.name = names[0]
    personToPush.surname = names[1]
    personToPush.email = this.personDataArr.at(i).value.email
    personToPush.phone = this.personDataArr.at(i).value.phone
    this.tempArr.push(personToPush)
    retrievedPeople.users = this.tempArr
    localStorage.setItem('peopleArray', JSON.stringify(retrievedPeople))
    console.log(retrievedPeople)
    console.log(personToPush)
    console.log(this.tempArr)

  }
  toggleButtons(i: number) {
    console.log(i)
  }
}
