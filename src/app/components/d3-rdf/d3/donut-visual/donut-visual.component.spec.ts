import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutVisualComponent } from './donut-visual.component';

describe('DonutVisualComponent', () => {
  let component: DonutVisualComponent;
  let fixture: ComponentFixture<DonutVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonutVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
