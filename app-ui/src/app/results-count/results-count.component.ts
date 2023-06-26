import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-results-count',
  templateUrl: './results-count.component.html',
  styleUrls: ['./results-count.component.css'],
})
export class ResultsCountComponent {
  @Input() offset: number = 0;
  @Input() totalPages: number = 0;
  @Input() totalRecords: number = 0;
  @Input() results: number = 0;
}
