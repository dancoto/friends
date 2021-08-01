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
  private margin: { top: number; bottom: number; left: number; right: number } =
    { top: 30, bottom: 50, left: 50, right: 50 };

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    // If we are changing the axis, redraw the chart
    if (
      (changes.xAxis && !changes.xAxis.isFirstChange()) ||
      (changes.yAxis && !changes.yAxis.isFirstChange())
    ) {
      this.drawChart();
    } else {
      // Otherwise just update the data
      this.updateChart();
    }
  }

  ngAfterViewInit() {
    // Redner initial chart after init so container has the correct dimensions to use
    this.drawChart();
  }

  ngOnInit() {
    this.xScale = d3.scaleLinear();
    this.yScale = d3.scaleLinear();
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
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

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
          (this.innerHeight() + this.margin.top) +
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
      .attr('y', 0 - this.margin.left)
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

  private redrawElements() {
    const svg = d3.select(this.chartContainer?.nativeElement);

    // Translate the X axis
    svg
      .select<SVGGElement>('#x-axis')
      .transition()
      .ease(d3.easePolyInOut)
      .duration(500)
      .attr('transform', `translate(0,${this.innerHeight()})`)
      .call(d3.axisBottom(this.xScale));

    // Translate the X-Axis label
    svg
      .select<SVGGElement>('#x-axis-label')
      .transition()
      .ease(d3.easePolyInOut)
      .duration(500)
      .attr(
        'transform',
        `translate(
          ${this.innerWidth() / 2}
          ,
          ${this.innerHeight() + this.margin.top})`
      );

    // Adjust the Y axis accordingly
    svg
      .select<SVGGElement>('#y-axis')
      .transition()
      .ease(d3.easePolyInOut)
      .duration(500)
      .call(d3.axisLeft(this.yScale));

    svg
      .select<SVGGElement>('#y-axis-label')
      .transition()
      .ease(d3.easePolyInOut)
      .duration(500)
      .attr(
        'transform',
        `translate(
          ${this.innerHeight() + this.margin.top}
          ,
          ${this.margin.left})`
      )
      .attr('transform', 'rotate(-90)');

    // select the circles so we can update the data
    let circles = svg.selectAll('circle').data(this.data) as d3.Selection<
      any,
      Friend,
      null,
      undefined
    >;

    // Handle merging of old and new data to redraw points
    circles
      .enter()
      .append('circle')
      .attr('r', 3)
      .attr('fill', '#6A1B9A')
      .merge(circles)
      .transition()
      .ease(d3.easePolyInOut)
      .duration(500)
      .attr('cx', (d) => this.xScale(d[this.xAxis]))
      .attr('cy', (d) => this.yScale(d[this.yAxis]));
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
}
