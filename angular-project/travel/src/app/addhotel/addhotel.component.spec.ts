import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddhotelComponent } from './addhotel.component';

describe('AddhotelComponent', () => {
  let component: AddhotelComponent;
  let fixture: ComponentFixture<AddhotelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddhotelComponent]
    });
    fixture = TestBed.createComponent(AddhotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
