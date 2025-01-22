import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnInit {
  inputSaga: string;
  sagas: string[] = [];

  maxGenres = 3;
  genresList = ['Fantasía', 'Ciencia Ficción', 'Terror', 'Romance', 'Aventura', 
                'Misterio', 'Juvenil', 'Épica'];

  bookForm: FormGroup;
  title: FormControl;
  author: FormControl;
  description: FormControl;
  pages: FormControl;
  year: FormControl;
  genres: FormArray;
  cover: FormControl;
  saga: FormControl;

  constructor(public bookService: BookService) {
    this.inputSaga = '';

    this.title = new FormControl('',Validators.required);
    this.author = new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]);
    this.description = new FormControl('',Validators.required);
    this.pages = new FormControl('',[Validators.required, Validators.min(1)]);
    this.year = new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(4)]);
    this.genres = new FormArray<FormControl>([]);
    this.cover = new FormControl('',[Validators.required, Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)]);
    this.saga = new FormControl();

    this.bookForm = new FormGroup({
      title: this.title,
      author: this.author,
      description: this.description,
      pages: this.pages,
      year: this.year,
      genres: this.genres,
      cover: this.cover,
      saga: this.saga
    });
  }

  ngOnInit() {
    this.addGenre();
    this.bookService.getSagas().subscribe({
      next: (data) => {
        this.sagas = data;
      },
      error: (e) => {
        console.error(e);
      }
    });
  }



  handleSubmit() {
    console.log(this.bookForm.value);
    
    this.bookService.createBook(this.bookForm.value).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => {
        console.error(e);
      }
    });

    this.bookForm.reset();
  }

  addGenre() {
    if (this.genres.length < this.maxGenres) {
      this.genres.push(new FormControl('',Validators.required));
    }
  }

  // onInputChange(event: Event): void {
  //   this.inputSaga= (event.target as HTMLInputElement).value;
  // }

  // addOptionIfNew(): void {
  //   const currentSaga = this.bookForm.get('saga')?.value;
  //   if (currentSaga && !this.sagas.includes(currentSaga)) {
  //     this.sagas.push(currentSaga);
  //   }
  // }
}
