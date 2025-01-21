import { booleanAttribute, Component, EventEmitter, input, Output, output, signal } from '@angular/core';

@Component({
  selector: 'app-confirmation-popup',
  imports: [],
  templateUrl: './confirmation-popup.component.html',
  styleUrl: './confirmation-popup.component.css'
})
export class ConfirmationPopupComponent {
  message = input<string>();
  @Output() confirm = new EventEmitter<boolean>();
  // confirm = output<boolean>; 

  onConfirm() {
    this.confirm.emit(true);
  }

  onCancel() {
    this.confirm.emit(false);
  }
}
