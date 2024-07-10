import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdithotelsComponent } from './edithotels.component';

describe('EdithotelsComponent', () => {
  let component: EdithotelsComponent;
  let fixture: ComponentFixture<EdithotelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdithotelsComponent]
    });
    fixture = TestBed.createComponent(EdithotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
