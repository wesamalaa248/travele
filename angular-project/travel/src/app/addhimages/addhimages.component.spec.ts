import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddhimagesComponent } from './addhimages.component';

describe('AddhimagesComponent', () => {
  let component: AddhimagesComponent;
  let fixture: ComponentFixture<AddhimagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddhimagesComponent]
    });
    fixture = TestBed.createComponent(AddhimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
