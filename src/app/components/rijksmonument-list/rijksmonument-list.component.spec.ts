import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RijksmonumentListComponent } from './rijksmonument-list.component';

describe('RijksmonumentListComponent', () => {
  let component: RijksmonumentListComponent;
  let fixture: ComponentFixture<RijksmonumentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RijksmonumentListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RijksmonumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
