import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Book from '../../models/Book';
import { BookService } from '../../services/book.service';
import { HeaderComponent } from "../../components/header/header.component";
import { BookCalificationComponent } from '../../components/book-calification/book-calification.component';
import { BookCardComponent } from '../../components/book-card/book-card.component';

@Component({
  selector: 'app-book-details-page',
  imports: [HeaderComponent, BookCalificationComponent, BookCardComponent],
  templateUrl: './book-details-page.component.html',
  styleUrl: './book-details-page.component.css'
})
export class BookDetailsPageComponent implements OnInit{
  book?: Book;
  hayMasDeUnGenero: boolean;
  otrosLibrosSaga: Book[];

  constructor(public bookService: BookService, private route: ActivatedRoute) {
    this.hayMasDeUnGenero = false;
    this.otrosLibrosSaga = [];
  }

  ngOnInit() {
    this.setBook();
    this.setGeneros();
  }

  setBook() {
    this.bookService.getBookById(this.route.snapshot.params['id']).subscribe({
      next: (data) => {
        this.book = data;
        this.setSaga();
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

  setSaga() {
    if (this.book != undefined) {
      this.bookService.getBookBySaga(this.book?.saga).subscribe({
        next: (data) => {
          this.otrosLibrosSaga = data;
        },
        error: (e) => {
          console.error(e);
        }
      })
    }
  }

  setGeneros() {
    if (this.book && this.book.genres.length === 1) {
      this.hayMasDeUnGenero = false;
    } else {
      this.hayMasDeUnGenero = true;
    }
  }
}
