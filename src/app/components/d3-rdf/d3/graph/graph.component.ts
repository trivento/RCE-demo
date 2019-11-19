import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { D3Service } from '../../../../services/d3/d3.service';
import { ForceDirectedGraph, Node, Link } from '../../../../models/';

@Component({
  selector: 'app-d3-graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class D3GraphComponent {
  graph: ForceDirectedGraph;
  @Input('nodes') nodes: Node[];
  @Input('links') links: Link[];
  @Input('options') options: { width, height };
  @Output('nodeClicked') nodeClicked :EventEmitter<Node>;

  constructor(private d3Service: D3Service, private ref: ChangeDetectorRef) {
    this.nodeClicked = new EventEmitter()
  }

  initGraph(nodes, links) {
    this.graph = this.d3Service.getForceDirectedGraph(nodes, links, this.options); 
    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
    });
  }

  updateGraph(){
    this.graph.initSimulation(this.options, this.nodes, this.links);
  }

  nodeClick(node: Node) {
    this.nodeClicked.emit(node);
  }
}
