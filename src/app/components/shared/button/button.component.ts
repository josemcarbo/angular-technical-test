import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() icon: string | null = null;
  @Input() rounded: Boolean = false;
  @Input() fixed: Boolean = false;
  @Input() filled: Boolean = true;
  @Input() size: 'normal' | 'small' | 'large' = 'normal';
  @Input() disabled: boolean = false;
  @Output() onClicked = new EventEmitter<void>();

  onClick() {
    this.onClicked.emit();
  }
}
