import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Note } from './note';
import { AppConstants } from './constant';
import { ChangeDetectionStrategy } from '@angular/core/src/render3/jit/compiler_facade_interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  options = {
    theme: 'vs-dark',
    language: 'python',
    fontSize: '20px'
  };

  public notes: Array<Note>;
  public editorReadOnlyTextOptions: any;
  public languageList = AppConstants.languages;

  constructor(private cdr: ChangeDetectorRef) {
    this.notes = new Array<Note>();
  }

  ngOnInit() {
    if (localStorage.getItem('notes')) {
      this.notes = JSON.parse(localStorage.getItem('notes'));
      if (this.notes) {
        this.notes.map(x => {
          x.new_text = x.old_text;
          x.isEdit = false;
        })
      }
    }
  }

  addNote() {
    let model: Note = new Note();
    model.id = this.notes.length == 0 ? 1 : this.notes[this.notes.length - 1].id + 1;
    model.old_text = '';
    model.new_text = '';
    this.notes.push(model);

    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  removeNote(id: number) {
    this.notes = this.notes.filter(x => x.id != id);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  onEditClick(id: number) {    
    this.notes.map(x => {
      if (x.id == id) {
        if (x.new_text != x.old_text) {
          x.isEdit = true;
        } else {
          x.isEdit = false;
        }
      }
    });
  }

  saveNote(id: number) {    
    this.notes.filter(x => x.id == id)[0].old_text = this.notes.filter(x => x.id == id)[0].new_text;
    this.notes.filter(x => x.id == id)[0].isEdit = false;
    localStorage.setItem('notes', JSON.stringify(this.notes));

    if (localStorage.getItem('notes')) {
      this.notes = JSON.parse(localStorage.getItem('notes'));
      if (this.notes) {
        this.notes.map(x => {          
          if(x.id == id){
            x.isEdit = false;
          }   
        })
      }
    }
  }

  changeLanguage(id: number, language: string) {
    if (this.notes.filter(x => x.id == id)[0].option.language != language) {
      this.notes.filter(x => x.id == id)[0].isEdit = true;
      this.notes.filter(x => x.id == id)[0].option.language = language;
    }
  }
}
