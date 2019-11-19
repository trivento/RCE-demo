
import { APP_CONFIG } from '../../app.config';
import * as d3 from 'd3';

export interface NodeConfig {
  id: string;
  uri: string;
  entity: any;
  text: string;
  stroke: string;
  fill: string;
  textColor: string;
  entityType: string;
}
// Implementing SimulationNodeDatum interface into our custom Node class
export class Node implements d3.SimulationNodeDatum {
  // Optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  id: string;
  uri: string;
  text: string;
  entity: any;
  stroke: string;
  fill: string;
  textColor: string;
  percentage: number;
  scale: number = 1.5;
  entityType: string;

  constructor(config: NodeConfig) {
    this.id = config.id;
    this.entity = config.entity;
    this.stroke = config.stroke || APP_CONFIG.COLORS.WHITE;
    this.fill = config.fill || 'transparent';
    this.textColor = config.textColor || APP_CONFIG.COLORS.WHITE;
    this.text = config.text;
    this.entityType = config.entityType;
  }

  normal = () => {
    return Math.sqrt(1 / APP_CONFIG.N);
  }

  get r() {
    return (50 * this.normal() + 10) / this.scale;
  }

  get fontSize() {
    return ((10 * this.normal() + 10) / 10) / this.scale + 'em';
  }

  get transformCx() {
    // const node = document.getElementById('zoomableSVG');
    // const scale = 1 / d3.zoomTransform(node).k;
    // console.log(scale);
    // return Math.max(this.r, Math.min((window.innerWidth * scale) - this.r, (this.x * scale)))
    // return Math.max(this.r, Math.min(window.innerWidth - this.r, this.x))
    return this.x;
  }

  get transformCy() {
    // const node = document.getElementById('zoomableSVG');
    // const scale = 1 / d3.zoomTransform(node).k;
    // console.log(scale);
    // return Math.max(this.r, Math.min((window.innerHeight * scale) - this.r, (this.y * scale)))
    // return Math.max(this.r, Math.min(window.innerHeight - this.r - 150, this.y))
    return this.y;
  }

}