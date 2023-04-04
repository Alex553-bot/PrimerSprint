import { Component } from '@angular/core';

@Component({
  selector: 'app-funciones',
  templateUrl: './funciones.component.html',
  styleUrls: ['./funciones.component.css']
})
export class FuncionesComponent {
  constructor() {}
    guardarJSON(text: string, filename: string) {
    const file = new Blob([text], { type : 'JSON;chairset=utf-8' });
    saveAs(file, filename);
  }

}
