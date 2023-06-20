import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTableRowComponent } from './movie-table-row.component';

describe('MovieTableRowComponent', () => {
  let component: MovieTableRowComponent;
  let fixture: ComponentFixture<MovieTableRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieTableRowComponent]
    });
    fixture = TestBed.createComponent(MovieTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
