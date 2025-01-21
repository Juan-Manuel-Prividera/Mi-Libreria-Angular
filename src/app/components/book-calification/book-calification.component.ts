import { Component, input } from '@angular/core';
import Book from '../../models/Book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-calification',
  imports: [],
  templateUrl: './book-calification.component.html',
  styleUrl: './book-calification.component.css'
})
export class BookCalificationComponent {
  book = input<Book>(); 
  stars: boolean[];

  constructor(public bookService: BookService) {
    this.stars = Array(5).fill(false);
  }

  setRating(rating: number) {
    const book = this.book();
    if (book) {
      book.calification = rating;
      this.updateRating(book);
    }

    this.stars = Array(5).fill(false).map((_, i) => i < rating); // Actualiza las estrellas.
  }

  updateRating(book: Book) {
    this.bookService.updateBook(book).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (e) => {
        console.error(e);
      }
    });
  }
   
}
