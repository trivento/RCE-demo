import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualSearchPage } from './visual-search.page';

describe('VisualSearchPage', () => {
  let component: VisualSearchPage;
  let fixture: ComponentFixture<VisualSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
