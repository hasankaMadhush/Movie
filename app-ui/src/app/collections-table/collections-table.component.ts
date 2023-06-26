import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import * as dayjs from 'dayjs';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import Collection from 'src/app/interfaces/collection.interface';
import { environment } from 'src/environments/environment';

const { defualtDateFormat } = environment;

@Component({
  selector: 'app-collections-table',
  templateUrl: './collections-table.component.html',
  styleUrls: ['./collections-table.component.css'],
})
export class CollectionsTableComponent {
  dayjs = dayjs;
  faTrash = faTrash;

  @Input() headers: string[] = [];
  @Input() collections: Collection[] = [];
  @Input() all: boolean = false;

  dateFormat: string = defualtDateFormat;

  constructor(private router: Router) {}

  // takes to a single collection view
  navigateTo(id: string) {
    this.router.navigate(['collections', id]);
  }
}
