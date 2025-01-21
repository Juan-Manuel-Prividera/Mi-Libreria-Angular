import { Component, input, OnInit, Signal } from '@angular/core';
import Book from '../../models/Book';
import { RouterModule } from '@angular/router';
import { BookCalificationComponent } from "../book-calification/book-calification.component";
import { BookService } from '../../services/book.service';
import { ConfirmationPopupComponent } from "../confirmation-popup/confirmation-popup.component";

@Component({
  selector: 'app-book-card',
  imports: [RouterModule, BookCalificationComponent, ConfirmationPopupComponent],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent implements OnInit {
  book = input<Book>();
  hayMasDeUnGenero: boolean;
  showPopup: boolean;

  constructor(public bookService: BookService) {
    this.hayMasDeUnGenero = false;
    this.showPopup = false;
  }

  ngOnInit() {
    const book = this.book();
    if (book && book.genres.length === 1) {
      this.hayMasDeUnGenero = false;
    } else {
      this.hayMasDeUnGenero = true;
    } 
  }

  marcarComoLeido() {
    const book = this.book();
    if (book) {
      book.pending = false;
    }
  }

  eliminarLibro() {
    this.showPopup = true;
  }

  confirmarEliminacion(confirm: boolean) {
    if (confirm) {
      const book = this.book();
      if (book) {
        this.bookService.deleteBook(book.id).subscribe({
          next: () => {
            console.log('Libro eliminado');
            window.location.reload();
          },
          error: (e) => {
            console.error(e);
          }
        });
      }
    }
    this.showPopup = false; 
  }
}
