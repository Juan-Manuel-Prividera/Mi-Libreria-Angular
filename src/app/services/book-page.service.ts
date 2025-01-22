import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookPageService {
  private cardDeletedSource = new Subject<void>();

  // Observable al que se pueden suscribir otros componentes
  cardDeleted$ = this.cardDeletedSource.asObservable();

  // Método para notificar que un card fue eliminado
  notifyCardDeleted() {
    this.cardDeletedSource.next();
  }
}
