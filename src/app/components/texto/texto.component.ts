import { Component } from '@angular/core';
import { Editor } from 'ngx-editor';
import { OnInit,OnDestroy } from '@angular/core';
import { toDoc } from 'ngx-editor';

@Component({
  selector: 'app-texto',
  templateUrl: './texto.component.html',
  styleUrls: ['./texto.component.css']
})

export class TextoComponent implements OnInit, OnDestroy {
  editor: Editor = new Editor;
  html = ' <b>Yo como:</b><br><b>Quiero:</b><br><b>Tal que:</b>';
  

  ngOnInit(): void {
    this.editor = new Editor();
    const jsonDoc = toDoc(this.html);
    this.editor.commands.textColor('red').insertText('Hello world!').focus().scrollIntoView().exec();
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
