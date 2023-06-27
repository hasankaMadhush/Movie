import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() delete = new EventEmitter<Collection>();

  thumbnailImg: string =
    'https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80';
  dateFormat: string = defualtDateFormat;

  constructor(private router: Router) {}

  // takes to a single collection view
  navigateTo(id: string) {
    this.router.navigate(['collections', id]);
  }

  onDelete(collection: Collection) {
    this.delete.emit(collection);
  }
}
