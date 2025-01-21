import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import Book from '../../models/Book';
import { BookService } from '../../services/book.service';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { FormsModule } from '@angular/forms';
// import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-book-page',
  imports: [HeaderComponent, BookCardComponent, SearchBarComponent, FormsModule],
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.css'
})

export class BookPageComponent implements OnInit {
  books: Book[];
  sortCriteria : string;

  constructor(public bookService: BookService) {
    this.books = [];
    this.sortCriteria = 'date'; 
  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => { 
        this.books = data;
        this.orderByDate();
      },
      error: (e) => { 
        console.error(e);
      }
    })
  }

  sortedBooks() {
    switch (this.sortCriteria) {
      case 'author':
        this.orderByAuthor();
        break;
      case 'date':
        this.orderByDate();
        break;
      case 'pending':
        this.orderByPending();
        break;
      default:
        break;
        
    }
  }

  orderByDate() {   
    this.books = this.books.sort((a, b) => {
      return a.year - b.year;
    });
  }

  orderByAuthor() {
    this.books = this.books.sort((a, b) => {
      return a.author.localeCompare(b.author);
    });
  }

  orderByPending() {
    this.books = this.books.sort((a, b) => {
      return a.pending === b.pending ? 0 : a.pending ? -1 : 1;
    });
  }

  orderByTitle() {
    this.books = this.books.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  }



  // filterByGenre(genre: string) {
  //   this.books = this.books.filter(book => book.genre === genre);
  // }

  filterByAuthor(author: string) {
    this.books = this.books.filter(book => book.author === author);
  }

  findByTitle(title: string) {
    this.books = this.books.filter(book => book.title === title);
  }
  
  filterByPending(pending: boolean) {
    this.books = this.books.filter(book => book.pending === pending);
  }
}
