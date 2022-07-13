import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',
  styleUrls: ['./presentacion.component.css'],
})
export class PresentacionComponent implements OnInit {
  title = 'Página principal';

  technologies = ['Angular', 'Spring Boot'];

  constructor() {}

  ngOnInit(): void {}
}
