import { Component, OnInit } from '@angular/core';
import {FetchDataService} from "../../Services/fetch-data.service";

const person = {
  "users": [{
    "name": "Александр",
    "surname": "Петров",
    "email": "petrov@mail.ru",
    "phone": "+79061856195"
  }, {
    "name": "Павел",
    "surname": "Прилучный",
    "email": "ppl98@mail.ru",
    "phone": "+79891456090"
  }, {
    "name": "Иван",
    "surname": "Охлобыстин",
    "email": "iohl_990@mail.ru",
    "phone": "+79053856195"
  }, {
    "name": "Марина",
    "surname": "Александрова",
    "email": "malexan21@mail.ru",
    "phone": "+79052206950"
  }, {
    "name": "Юрий",
    "surname": "Борисов",
    "email": "borisov@gmail.com",
    "phone": ""
  }
  ]
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor(private fetchDataService: FetchDataService) {
    // this.fetchDataService.getPersonData().subscribe((data) => console.log(data))
  }
  ngOnInit() {

  }

  personData = [{
    "name": "Александр",
    "surname": "Петров",
    "email": "petrov@mail.ru",
    "phone": "+79061856195"
  }, {
    "name": "Павел",
    "surname": "Прилучный",
    "email": "ppl98@mail.ru",
    "phone": "+79891456090"
  }, {
    "name": "Иван",
    "surname": "Охлобыстин",
    "email": "iohl_990@mail.ru",
    "phone": "+79053856195"
  }, {
    "name": "Марина",
    "surname": "Александрова",
    "email": "malexan21@mail.ru",
    "phone": "+79052206950"
  }, {
    "name": "Юрий",
    "surname": "Борисов",
    "email": "borisov@gmail.com",
    "phone": ""
  }
  ];


}
