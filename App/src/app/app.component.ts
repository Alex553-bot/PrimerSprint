import { Component } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App';
  constructor() {}
  guardar(text: string, filename: string) {
    const file = new Blob([text], { type : 'text/plain;chairset=utf-8' });
    saveAs(file, filename);
  }
}
