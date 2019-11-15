import { Component, OnInit, Input } from '@angular/core';
import { Link } from '../../../../models';

@Component({
  selector: '[linkVisual]',
  templateUrl: './link-visual.component.html',
  styleUrls: ['./link-visual.component.scss']
})
export class LinkVisualComponent implements OnInit {
  @Input('linkVisual') link: Link;
  constructor() { }

  ngOnInit() {
  }

}
