import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Node } from '../../../../models/';

@Component({
  selector: '[nodeVisual]',
  templateUrl: './node-visual.component.html',
  styleUrls: ['./node-visual.component.scss']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node: Node;
  @Output('nodeClicked') nodeClicked :EventEmitter<Node> = new EventEmitter();

  constructor() { }

  nodeClick(){
    this.nodeClicked.emit(this.node);
  }
}
