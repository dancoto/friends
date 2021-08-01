import {
  AfterViewInit,
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
import {
  CHART_MARGINS,
  DATA_BUFFER_MULTIPLIER,
  RESIZE_DEBOUNCE_TIME,
  TRANSITION_TIME,
} from './scatter-plot.constants';

@Component({
  selector: 'dancoto-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.scss'],
})
export class ScatterPlotComponent
  implements OnInit, OnDestroy, OnChanges, AfterViewInit
{
  @Input() xAxis!: AxisOptions;
  @Input() yAxis!: AxisOptions;
  @Input() data!: Friend[];
  @ViewChild('chart', { static: true })
  private chartContainer?: ElementRef;
  private resize$!: Observable<Event>;
  private resizeSubscription!: Subscription;
  private xScale!: d3.ScaleLinear<number, number, never>;
  private yScale!: d3.ScaleLinear<number, number, never>;
  private margins = CHART_MARGINS;

  constructor() {}

  /**
   * If axis is changing after initial load, fuly redraw the chart
   * Otherwise just update the chart with new dimensions and data
   *
   * @param {SimpleChanges} changes
   * @memberof ScatterPlotComponent
   */
  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes.xAxis && !changes.xAxis.isFirstChange()) ||
      (changes.yAxis && !changes.yAxis.isFirstChange())
    ) {
      this.drawChart();
    } else {
      this.updateChart();
    }
  }

  /**
   * Render the initial chart after the container is loaded
   * to get the correct height and width
   *
   * @memberof ScatterPlotComponent
   */
  ngAfterViewInit() {
    this.drawChart();
  }

  /**
   * Set the x and y scales and setup listener on resize
   *
   * @memberof ScatterPlotComponent
   */
  ngOnInit() {
    this.xScale = d3.scaleLinear();
    this.yScale = d3.scaleLinear();
    this.setResizeListener();
  }

  /**
   * Clear the resize subscription if its not closed
   *
   * @memberof ScatterPlotComponent
   */
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
    this.redrawElements();
  }

  /**
   * Draw the fresh chart
   * Used on init and also when changing axis
   *
   * @private
   * @memberof ScatterPlotComponent
   */
  private drawChart() {
    // Get the main SVG
    const svg = d3.select(this.chartContainer?.nativeElement);
    svg.selectAll('*').remove(); //Clear the children on a full redraw

    // based on the SVG above, we will be adding our data and axis to chart
    const chart = svg
      .append('g')
      .attr('id', 'main-chart')
      .attr('transform', `translate(${this.margins.left},${this.margins.top})`);

    this.setScaleBasedOnData();

    // Add in X Axis
    chart
      .append('g')
      .attr('id', 'x-axis')
      .attr('transform', `translate(0,${this.innerHeight()})`)
      .call(d3.axisBottom(this.xScale)); // bottom: text will be shown below the line

    chart
      .append('text')
      .attr('id', 'x-axis-label')
      .attr(
        'transform',
        'translate(' +
          this.innerWidth() / 2 +
          ' ,' +
          (this.innerHeight() + this.margins.top) +
          ')'
      )
      .style('text-anchor', 'middle')
      .style('text-transform', 'capitalize')
      .text(this.xAxis);

    // Add in Y Axis
    chart.append('g').attr('id', 'y-axis').call(d3.axisLeft(this.yScale));
    chart
      .append('text')
      .attr('id', 'y-axis-label')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - this.margins.left)
      .attr('x', 0 - this.innerHeight() / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('text-transform', 'capitalize')
      .text(this.yAxis);

    // Add data in
    chart
      .selectAll('circle')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('cx', (d) => this.xScale(d[this.xAxis]))
      .attr('cy', (d) => this.yScale(d[this.yAxis]))
      .attr('r', 3)
      .attr('fill', '#6A1B9A');
  }

  /**
   * Set an observable to listen to resize events and add a debounce
   *
   * @private
   * @memberof ScatterPlotComponent
   */
  private setResizeListener() {
    this.resize$ = fromEvent(window, 'resize').pipe(
      debounceTime(RESIZE_DEBOUNCE_TIME)
    );
    this.resizeSubscription = this.resize$.subscribe((event) =>
      this.onResize()
    );
  }

  /**
   * Set the scale for screen size and data range for X and Y
   *
   * @private
   * @memberof ScatterPlotComponent
   */
  private setScaleBasedOnData() {
    this.xScale
      .range([0, this.innerWidth()])
      .domain([
        0,
        d3.max(this.data, (d) =>
          Math.ceil(d[this.xAxis] * DATA_BUFFER_MULTIPLIER)
        ) as number,
      ]);

    this.yScale
      .range([this.innerHeight(), 0])
      .domain([
        0,
        d3.max(this.data, (d) =>
          Math.ceil(d[this.yAxis] * DATA_BUFFER_MULTIPLIER)
        ) as number,
      ]);
  }

  /**
   * Redraw the chart using current axis
   * Adjusts the values to screen size and new values coming in for the same
   * data set
   *
   * @private
   * @memberof ScatterPlotComponent
   */
  private redrawElements() {
    const svg = d3.select(this.chartContainer?.nativeElement);
    // Translate the X axis
    svg
      .select<SVGGElement>('#x-axis')
      .transition()
      .ease(d3.easePolyInOut)
      .duration(TRANSITION_TIME)
      .attr('transform', `translate(0,${this.innerHeight()})`)
      .call(d3.axisBottom(this.xScale));

    // Translate the X-Axis label
    svg
      .select<SVGGElement>('#x-axis-label')
      .transition()
      .ease(d3.easePolyInOut)
      .duration(TRANSITION_TIME)
      .attr(
        'transform',
        `translate(
          ${this.innerWidth() / 2}
          ,
          ${this.innerHeight() + this.margins.top})`
      );

    // Adjust the Y axis accordingly
    svg
      .select<SVGGElement>('#y-axis')
      .transition()
      .ease(d3.easePolyInOut)
      .duration(TRANSITION_TIME)
      .call(d3.axisLeft(this.yScale));

    svg
      .select<SVGGElement>('#y-axis-label')
      .transition()
      .ease(d3.easePolyInOut)
      .duration(TRANSITION_TIME)
      .attr(
        'transform',
        `translate(rotate(90),
          ${this.margins.left}
          ,
          ${this.innerHeight() + this.margins.top}, rotate(-90))`
      );

    // select the circles inside the main chart so we can update the data
    // Otherwise they may be rendered outside of the scope of the chart
    let circles = d3
      .select('#main-chart')
      .selectAll('circle')
      .data(this.data) as d3.Selection<any, Friend, null, undefined>;

    // Handle merging of old and new data to redraw points
    circles
      .enter()
      .append('circle')
      .attr('r', 3)
      .attr('fill', '#6A1B9A')
      .merge(circles)
      .transition()
      .ease(d3.easePolyInOut)
      .duration(TRANSITION_TIME)
      .attr('cx', (d) => this.xScale(d[this.xAxis]))
      .attr('cy', (d) => this.yScale(d[this.yAxis]));

    circles.exit().remove();
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
      this.margins.left -
      this.margins.right
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
      this.margins.top -
      this.margins.bottom
    );
  }
}
