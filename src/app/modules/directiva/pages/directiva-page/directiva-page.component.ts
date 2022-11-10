import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva-page',
  templateUrl: './directiva-page.component.html',
  styleUrls: ['./directiva-page.component.css'],
})
export class DirectivaPageComponent {
  title = 'Bienvenido a Angular';
  tecnologias: string[] = ['Angular', 'Typescript', 'Java', 'Spring 5'];

  habilitar: boolean = true;

  cambiarEstado(): void {
    this.habilitar = !this.habilitar;
  }
}
