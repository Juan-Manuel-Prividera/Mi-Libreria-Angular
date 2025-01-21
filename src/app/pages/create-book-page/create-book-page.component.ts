import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { BookFormComponent } from "../../components/book-form/book-form.component";

@Component({
  selector: 'app-create-book-page',
  imports: [HeaderComponent, BookFormComponent],
  templateUrl: './create-book-page.component.html',
  styleUrl: './create-book-page.component.css'
})
export class CreateBookPageComponent {

}
