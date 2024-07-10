import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetflightComponent } from './getflight.component';

describe('GetflightComponent', () => {
  let component: GetflightComponent;
  let fixture: ComponentFixture<GetflightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetflightComponent]
    });
    fixture = TestBed.createComponent(GetflightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
