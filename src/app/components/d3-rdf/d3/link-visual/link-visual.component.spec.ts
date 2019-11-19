import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkVisualComponent } from './link-visual.component';
import { Link, Node } from '../../../models/';

describe('LinkVisualComponent', () => {
  let component: LinkVisualComponent;
  let fixture: ComponentFixture<LinkVisualComponent>;
  let link: Link;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LinkVisualComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkVisualComponent);
    component = fixture.componentInstance;
    let node1 = new Node({
      id: '1',
      fill: '',
      goal: {
        id: '1',
        title: 'doel 1',
        type: null,
        plannedEndDate: null,
        points: 0,
        totalPoints: 0,
        subGoals: []
      },
      stroke: '',
      textColor: '',
      count: 2
    });
    node1.x = 0;
    node1.y = 0;
    let node2 = new Node({
      id: '2',
      goal: {
        id: '2',
        title: 'doel 2',
        type: null,
        plannedEndDate: null,
        points: 0,
        totalPoints: 0,
        subGoals: []
      },
      fill: '',
      stroke: '',
      textColor: '',
      count: 2
    });
    node2.x = 1;
    node2.y = 1;
    link = new Link(node1, node2)
    component.link = link;

    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
