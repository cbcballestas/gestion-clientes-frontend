import { Component, OnInit } from '@angular/core';

interface Footer {
  nombre: string;
  apellido: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  autor: Footer = {
    nombre: 'Carlos',
    apellido: 'Ballestas',
  };

  constructor() {}

  ngOnInit(): void {}
}
