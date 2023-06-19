import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCollectionsComponent } from './my-collections.component';

describe('MyCollectionsComponent', () => {
  let component: MyCollectionsComponent;
  let fixture: ComponentFixture<MyCollectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCollectionsComponent]
    });
    fixture = TestBed.createComponent(MyCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
