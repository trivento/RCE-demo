import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3RdfComponent } from './d3-rdf.component';

describe('D3RdfComponent', () => {
  let component: D3RdfComponent;
  let fixture: ComponentFixture<D3RdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3RdfComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3RdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
