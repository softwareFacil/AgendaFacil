import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcategoryComponent } from './listcategory.component';

describe('ListcategoryComponent', () => {
  let component: ListcategoryComponent;
  let fixture: ComponentFixture<ListcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
