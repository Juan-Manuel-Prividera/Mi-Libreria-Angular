import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { BookService } from '../../services/book.service';
import Book from '../../models/Book';
import { input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports:[FormsModule, NgClass, RouterModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit{
  searchQuery: string; 
  books: Book[];
  filteredBooks: Book[];
  hayLibros: boolean;
  results: boolean;

  constructor(public bookService: BookService) {
    this.books = [] 
    this.filteredBooks = [];
    this.searchQuery = '';
    this.hayLibros = false;
    this.results = false;
  }

  ngOnInit() {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

  onSearch() {
    this.results = true;
    this.filteredBooks = this.books.filter((book) =>
      book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.hayLibros = this.filteredBooks.length > 0;
  }

  showResults() {
    this.results = true;
  }
  hideResults() {
    setTimeout(() => {
      this.results = false;
    }, 200);
  }
}
