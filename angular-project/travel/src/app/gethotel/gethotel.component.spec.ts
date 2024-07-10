import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GethotelComponent } from './gethotel.component';

describe('GethotelComponent', () => {
  let component: GethotelComponent;
  let fixture: ComponentFixture<GethotelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GethotelComponent]
    });
    fixture = TestBed.createComponent(GethotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
