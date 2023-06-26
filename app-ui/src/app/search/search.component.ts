import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  inputSubscription!: Subscription;
  data = [];
  @Output() onSearch = new EventEmitter<string>();

  form: FormGroup = new FormGroup({
    searchText: new FormControl(),
  });

  constructor() {}

  ngAfterContentInit() {
    this.inputSubscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.onSearch.emit(value.searchText);
      });
  }

  ngOnDestroy() {
    this.inputSubscription.unsubscribe();
  }
}
