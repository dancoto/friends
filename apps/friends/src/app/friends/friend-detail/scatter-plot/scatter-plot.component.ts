import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Friend } from '@dancoto/types';
import * as d3 from 'd3';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AxisOptions } from '../friend-detail.constants';

@Component({
  selector: 'dancoto-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.scss'],
})
export class ScatterPlotComponent implements OnInit, OnDestroy, OnChanges {
  @Input() xAxis!: AxisOptions;
  @Input() yAxis!: AxisOptions;
  @Input() data!: Friend[];
  // inject the svg element
  @ViewChild('chart', { static: true })
  private chartContainer?: ElementRef;
  private resize$!: Observable<Event>;
  private resizeSubscription!: Subscription;
  private margin: { top: number; bottom: number; left: number; right: number } =
    { top: 30, bottom: 50, left: 50, right: 50 };
  private readonly xScale: d3.ScaleLinear<number, number, never>;
  private readonly yScale: d3.ScaleLinear<number, number, never>;

  constructor() {
    this.xScale = d3.scaleLinear();
    this.yScale = d3.scaleLinear();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.xAxis || changes.yAxis) {
      this.drawChart();
    } else {
      this.updateChart();
    }
  }

  ngOnInit() {
    this.setResizeListener();
  }

  ngOnDestroy() {
    if (!this.resizeSubscription.closed) {
      this.resizeSubscription.unsubscribe();
    }
  }

  /**
   * Update the scales based on dimensions, then redraw elements
   *
   * @private
   * @memberof ScatterPlotComponent
   */
  private onResize() {
    this.xScale.range([0, this.innerWidth()]);
    this.yScale.range([this.innerHeight(), 0]);
    this.redrawElements();
  }

  /**
   * Update the chart with incoming new data
   *
   * @private
   * @memberof ScatterPlotComponent
   */
  private updateChart() {
    this.setScaleBasedOnData();
    this.redrawElements(true);
  }

  /**
   * Draw the initial chart
   *
   * @private
   * @memberof ScatterPlotComponent
   */
  private drawChart() {
    // Get the main SVG
    const svg = d3.select(this.chartContainer?.nativeElement);

    // based on the SVG above, we will be adding our data and axis to chart
    const chart = svg
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    this.setScaleBasedOnData();

    // Add in X Axis
    chart
      .append('g')
      .attr('id', 'x-axis')
      .attr('transform', `translate(0,${this.innerHeight()})`)
      .call(d3.axisBottom(this.xScale)); // bottom: text will be shown below the line

    // Add in Y Axis
    chart.append('g').attr('id', 'y-axis').call(d3.axisLeft(this.yScale)); // left: text will be shown left of the line

    // Add data in
    chart
      .selectAll('circle')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('cx', (d) => this.xScale(d[this.xAxis]))
      .attr('cy', (d) => this.yScale(d[this.yAxis]))
      .attr('r', 2)
      .attr('fill', 'dimgray');
  }

  /**
   * Calculate the current width of our chart based on the container
   * and adjust for left and right margins
   *
   * @private
   * @return {*}  {number}
   * @memberof ScatterPlotComponent
   */
  private innerWidth(): number {
    return (
      this.chartContainer?.nativeElement.clientWidth -
      this.margin.left -
      this.margin.right
    );
  }

  /**
   * Calculate the current height of our chart based on the container
   * and adjust for top and bottom margins
   *
   * @private
   * @return {*}  {number}
   * @memberof ScatterPlotComponent
   */
  private innerHeight(): number {
    return (
      this.chartContainer?.nativeElement.clientHeight -
      this.margin.top -
      this.margin.bottom
    );
  }

  /**
   * Set an observable to listen to resize events and add a debounce
   *
   * @private
   * @memberof ScatterPlotComponent
   */
  private setResizeListener() {
    this.resize$ = fromEvent(window, 'resize').pipe(debounceTime(200));
    this.resizeSubscription = this.resize$.subscribe((event) =>
      this.onResize()
    );
  }

  private setScaleBasedOnData() {
    // set the scale for screen size and data range for X and Y
    this.xScale
      .range([0, this.innerWidth()])
      .domain([0, d3.max(this.data, (d) => d[this.xAxis] * 1.1) as number]);

    this.yScale
      .range([this.innerHeight(), 0])
      .domain([0, d3.max(this.data, (d) => d[this.yAxis] * 1.1) as number]);
  }

  private redrawElements(newData: boolean = false) {
    const svg = d3.select(this.chartContainer?.nativeElement);
    svg
      .select<SVGGElement>('#x-axis')
      .transition()
      .ease(d3.easePolyInOut)
      .duration(500)
      .attr('transform', `translate(0,${this.innerHeight()})`)
      .call(d3.axisBottom(this.xScale));

    // Adjust the Y axis accordingly
    svg
      .select<SVGGElement>('#y-axis')
      .transition()
      .ease(d3.easePolyInOut)
      .duration(500)
      .call(d3.axisLeft(this.yScale));

    if (newData) {
      svg
        .selectAll('circle')
        .data(this.data)
        .enter()
        .transition()
        .ease(d3.easePolyInOut)
        .duration(500)
        .attr('cx', (d: any) => this.xScale(d[this.xAxis]))
        .attr('cy', (d: any) => this.yScale(d[this.yAxis]));
    } else {
      svg
        .selectAll('circle')
        .transition()
        .ease(d3.easePolyInOut)
        .duration(500)
        .attr('cx', (d: any) => this.xScale(d[this.xAxis]))
        .attr('cy', (d: any) => this.yScale(d[this.yAxis]));
    }
    // Reposition the existing data
  }
}
