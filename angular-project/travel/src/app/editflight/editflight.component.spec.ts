import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditflightComponent } from './editflight.component';

describe('EditflightComponent', () => {
  let component: EditflightComponent;
  let fixture: ComponentFixture<EditflightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditflightComponent]
    });
    fixture = TestBed.createComponent(EditflightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
