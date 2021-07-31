import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Friend } from '@dancoto/types';
import * as d3 from 'd3';
import { AxisOptions } from '../friend-detail.constants';
@Component({
  selector: 'dancoto-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScatterPlotComponent implements OnChanges {
  @Input() friends: Friend[] = [];
  @Input() margin = { top: 10, right: 30, bottom: 30, left: 60 };
  @Input() xAxis: AxisOptions = 'age';
  @Input() yAxis: AxisOptions = 'weight';

  maxLimitBuffer: number = 10;
  height: number = 400;
  width: number = 800;
  svg!: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>;
  tooltip!: d3.Selection<HTMLDivElement, unknown, HTMLElement, undefined>;
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    // If incoming data changes, redraw
    this.drawChart();
  }

  private drawChart() {
    d3.selectAll('#scatter-plot > *').remove();
    this.renderChart();
    this.updateAxisAndData();
  }

  private renderChart() {
    this.svg = d3
      .select('#scatter-plot')
      .append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', `0 0 ${this.width} ${this.height + 100}`)
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  }

  private updateAxisAndData() {
    // Add X axis + scale to max buffer
    const x = d3
      .scaleLinear()
      .domain([
        0,
        Math.max(...this.friends.map((friend) => friend[this.xAxis])) +
          this.maxLimitBuffer,
      ])
      .range([0, this.width - 100]);
    this.svg
      .append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(x));

    // Add the label for the axis
    this.svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', this.width / 2)
      .attr('y', this.height + 20)
      .attr('class', 'capitalize')
      .text(this.xAxis);

    // Add Y axis + scale to max buffer
    const y = d3
      .scaleLinear()
      .domain([
        0,
        Math.max(...this.friends.map((friend) => friend[this.yAxis])) +
          this.maxLimitBuffer,
      ])
      .range([this.height, 0]);
    this.svg.append('g').call(d3.axisLeft(y));

    this.svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('transform', 'rotate(-90)')
      .attr('y', -this.margin.left + 20)
      .attr('x', -this.margin.top - this.height / 2 + 20)
      .attr('class', 'capitalize')
      .text(this.yAxis);

    this.tooltip = d3
      .select('#scatter-plot')
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '1px')
      .style('border-radius', '5px')
      .style('padding', '10px');

    // Add Data
    this.svg
      .append('g')
      .selectAll('dot')
      .data(this.friends)
      .join('circle')
      .attr('cx', (d) => x(d[this.xAxis]))
      .attr('cy', (d) => y(d[this.yAxis]))
      .attr('r', 3)
      .on('mouseover', (event, d) => {
        this.tooltip.transition().duration(200).style('opacity', 0.9);
        this.tooltip
          .html(d.name)
          .style('left', event.pageX + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', (d) => {
        this.tooltip.transition().duration(500).style('opacity', 0);
      })
      .style('fill', '#673AB7');
  }
}
