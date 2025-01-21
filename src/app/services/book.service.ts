import { Injectable } from '@angular/core';
import Book from '../models/Book';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  readonly API_URL = 'http://localhost:8080';
  books: Book[];

  constructor(public http: HttpClient) { 
    this.books = [];
  }

  getBooks() {
    return this.http.get<Book[]>(this.API_URL + '/books')     
  }

  getBookById(id: number){
    return this.http.get<Book>(this.API_URL + '/books/' + id) 
  }

  getBookBySaga(saga: string){
    return this.http.get<Book[]>(this.API_URL + "/books/saga/" + saga)
  }

  createBook(book: Book) {
    return this.http.post<any>(this.API_URL + '/books', book) 
  }

  updateBook(book: Book) {
    return this.http.patch<any>(this.API_URL + '/books', book) 
  }

  getSagas() {
    return this.http.get<string[]>(this.API_URL + '/books/sagas')
  }

  deleteBook(id: number) {
    return this.http.delete<any>(this.API_URL + '/books/' + id) 
  }
}
