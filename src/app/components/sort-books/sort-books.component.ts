import { Component, input, output } from '@angular/core';
import Book from '../../models/Book';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sort-books',
  imports: [FormsModule],
  templateUrl: './sort-books.component.html',
  styleUrl: './sort-books.component.css'
})
export class SortBooksComponent {
  sortCriteria: string;
  books = input<Book[]>();
  booksSorted = output<Book[]>();

  constructor() { 
    this.sortCriteria = 'author';
  }

  sortedBooks() {
    switch (this.sortCriteria) {
      case 'author':
        this.orderByAuthor();
        break;
      case 'date-as':
        this.orderByDateAs();
        break;
      case 'date-des':
        this.orderByDateDes();
        break;
      case 'pending':
        this.orderByPending();
        break;
      case 'title':
        this.orderByTitle();
        break;
      default:
        break;
        
    }
  }

  orderByDateAs() {   
    const books = this.books();
    if (books) {
      this.booksSorted.emit(books.sort((a, b) => {
        return a.year - b.year;
      }));
    }
  }

  orderByDateDes() {
    const books = this.books();
    if (books) {
      this.booksSorted.emit(books.sort((a, b) => {
        return b.year - a.year;
      }));
    }
  }
  
  orderByAuthor() {
    const books = this.books();
    if (books) {
      this.booksSorted.emit(books.sort((a, b) => {
        return a.author.localeCompare(b.author);
      }));
    }
  }

  orderByPending() {
    const books = this.books();
    if (books) {
      this.booksSorted.emit(books.sort((a, b) => {
        return a.pending === b.pending ? 0 : a.pending ? -1 : 1;
      }));
    }
  }

  orderByTitle() {
    const books = this.books();
    if (books) {
      this.booksSorted.emit(books.sort((a, b) => {
        return a.title.localeCompare(b.title);
      }));
    }
  }
  
}
