import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3GraphComponent } from './graph.component';
import { D3Service } from '../../../services/d3/d3.service';
import { NodeVisualComponent } from '../node-visual/node-visual.component';
import { LinkVisualComponent } from '../link-visual/link-visual.component';
import { ZoomableDirective } from '../../../directives/d3/zoomable.directive';
import { DraggableDirective } from '../../../directives/d3/draggable.directive';

describe('GraphComponent', () => {
  let component: D3GraphComponent;
  let fixture: ComponentFixture<D3GraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        D3GraphComponent,
        NodeVisualComponent,
        LinkVisualComponent,
        ZoomableDirective,
        DraggableDirective
      ],
      providers: [
        D3Service
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3GraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
