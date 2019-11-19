import { Component, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

export interface IDonut {
  id: number;
  width: number;
  height: number;
  percentage: number;
  text: string;
  rotation: number;
  scale: number;
  textColor: string;
}

@Component({
  selector: 'app-donut-visual, [app-donut-visual]',
  templateUrl: './donut-visual.component.html',
  styleUrls: ['./donut-visual.component.scss']
})
export class DonutVisualComponent implements OnChanges, AfterViewInit {
  arc: d3.Arc<any, d3.DefaultArcObject>
  foregroundArc: d3.Selection<d3.BaseType, {
    endAngle: number;
  }, HTMLElement, any>
  // donut: IDonut;
  @Input('attr.percentage') percentage: number;
  @Input('attr.width') width: number;
  @Input('attr.height') height: number;
  @Input('attr.rotation') rotation: number;
  @Input('attr.scale') scale: number;
  @Input('attr.text') text: string;
  @Input('attr.textColor') textColor: string;
  @Input('attr.textColorFill') textColorFill: string;
  @Input('attr.fontSize') fontSize: string;
  @Input('attr.thickness') thickness: number;
  @Input('id') id: string;
  tau = 2 * Math.PI;
  circleScale = d3.scaleLinear().domain([0, 100]).range([0, this.tau]);

  constructor() {
    // init defaults
    this.percentage = 0;
    this.width = 2;
    this.height = 2;
    this.rotation = 0;
    this.scale = 100;
    this.textColor = '#000';
    this.textColorFill = '#000';
    this.fontSize = '1em';
    this.thickness = 5;
  }

  ngAfterViewInit() {
    this.arc = d3.arc()
      .innerRadius((this.height / 2) - this.thickness)
      .outerRadius(this.height / 2)
      .startAngle(this.circleScale(this.rotation - 25));

    // Get the SVG container, and apply a transform such that the origin is the
    // center of the canvas. This way, we don’t need to position arcs individually.
    let svg = d3.select("#svg_donut" + this.id);
    let g = svg.append("g").attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");

    //bachground arc
    g.append("path")
      .datum({ endAngle: this.circleScale(this.scale + this.rotation - 25) })
      .style("fill", "#ddd")
      .attr("d", this.arc);

    // Add the foreground arc
    this.foregroundArc = g.append("path")
      .datum({ endAngle: this.circleScale(this.rotation - 25) })
      .style("fill", "orange")
      .attr("d", this.arc);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.renderDonut();
  }

  renderDonut() {
    setTimeout(() => {
      // Animate foreground arc
      this.foregroundArc.transition()
        .duration(2000)
        .attrTween("d", this.arcTween(this.circleScale(this.scale / 100 * this.percentage + this.rotation - 25)));
    });
  }

  arcTween(newAngle) {
    return (d) => {
      var interpolate = d3.interpolate(d.endAngle, newAngle);
      return (t) => {
        d.endAngle = interpolate(t);
        return this.arc(d);
      };
    };
  }
}
