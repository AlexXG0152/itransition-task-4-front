import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appMultiSelect]',
})
export class MultiSelectDirective {
  @Input('appCheckbox') isChecked!: boolean;
  @Output() isCheckedChange = new EventEmitter<boolean>();

  constructor(private el: ElementRef) {}

  @HostListener('click') onClick() {
    this.isChecked = !this.isChecked;
    this.isCheckedChange.emit(this.isChecked);
  }

  ngOnChanges() {
    this.updateCheckbox();
  }

  private updateCheckbox() {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = this.isChecked;

    const label = document.createElement('label');

    while (this.el.nativeElement.firstChild) {
      this.el.nativeElement.firstChild.remove();
    }

    this.el.nativeElement.appendChild(checkbox);
    this.el.nativeElement.appendChild(label);
  }
}
