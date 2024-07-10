import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GettripComponent } from './gettrip.component';

describe('GettripComponent', () => {
  let component: GettripComponent;
  let fixture: ComponentFixture<GettripComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GettripComponent]
    });
    fixture = TestBed.createComponent(GettripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
