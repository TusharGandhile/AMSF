import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedimagesComponent } from './savedimages.component';

describe('SavedimagesComponent', () => {
  let component: SavedimagesComponent;
  let fixture: ComponentFixture<SavedimagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedimagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
