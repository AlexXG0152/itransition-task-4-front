import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckboxService {
  selectedCheckboxValues: number[] = [];

  addSelectedCheckbox(checkboxValue: number): void {
    this.selectedCheckboxValues.push(checkboxValue);
  }

  removeSelectedCheckbox(checkboxValue: number): void {
    const index = this.selectedCheckboxValues.indexOf(checkboxValue);
    if (index !== -1) {
      this.selectedCheckboxValues.splice(index, 1);
    }
  }

  clearSelectedCheckboxes(): void {
    this.selectedCheckboxValues = [];
  }
}
