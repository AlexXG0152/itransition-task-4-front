import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckboxService {
  selectedCheckboxValues: any[] = [];

  addSelectedCheckbox(checkboxValue: any) {
    this.selectedCheckboxValues.push(checkboxValue);
  }

  removeSelectedCheckbox(checkboxValue: any) {
    const index = this.selectedCheckboxValues.indexOf(checkboxValue);
    if (index !== -1) {
      this.selectedCheckboxValues.splice(index, 1);
    }
  }

  clearSelectedCheckboxes() {
    this.selectedCheckboxValues = [];
  }
}
