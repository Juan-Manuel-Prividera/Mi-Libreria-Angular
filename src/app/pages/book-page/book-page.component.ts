import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import Book from '../../models/Book';
import { BookService } from '../../services/book.service';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookPageService } from '../../services/book-page.service';
import { waitForAsync } from '@angular/core/testing';
import { SortBooksComponent } from "../../components/sort-books/sort-books.component";
// import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-book-page',
  imports: [HeaderComponent, BookCardComponent, SearchBarComponent, FormsModule, SortBooksComponent],
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.css'
})

export class BookPageComponent implements OnInit {
  books: Book[];
  subscription: Subscription;

  constructor(public bookService: BookService, public bookPageService: BookPageService) {
    this.books = [];
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.reloadBooks();
    this.subscription = this.bookPageService.cardDeleted$.subscribe(() => {
      console.log('Card deleted');
      this.reloadBooks();
      console.log('Books reloaded');
    });
  }

  reloadBooks() {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  sortBooks(books: Book[]) {
    this.books = books;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

function wait(arg0: number) {
  throw new Error('Function not implemented.');
}
