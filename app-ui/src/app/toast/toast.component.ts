import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent {
  @Input() title!: string;
  @Input() body!: string;
  @Output() onClose = new EventEmitter<boolean>();

  handleClose() {
    this.onClose.emit(true);
  }
}
