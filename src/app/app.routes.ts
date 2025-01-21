import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookPageComponent } from './pages/book-page/book-page.component';
import { BookDetailsPageComponent } from './pages/book-details-page/book-details-page.component';
import { CreateBookPageComponent } from './pages/create-book-page/create-book-page.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BookPageComponent },
  { path: 'books/:id', component: BookDetailsPageComponent },
  { path: 'create', component: CreateBookPageComponent },
];

