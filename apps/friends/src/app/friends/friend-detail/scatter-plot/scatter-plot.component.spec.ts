import { SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScatterPlotComponent } from './scatter-plot.component';
describe('ScatterPlotComponent', () => {
  let component: ScatterPlotComponent;
  let fixture: ComponentFixture<ScatterPlotComponent>;
  let drawChartSpy: jest.SpyInstance;
  let updateChartSpy: jest.SpyInstance;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScatterPlotComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterPlotComponent);
    component = fixture.componentInstance;
    drawChartSpy = jest.spyOn(component as any, 'drawChart');
    updateChartSpy = jest.spyOn(component as any, 'updateChart');
    component.data = [
      {
        name: 'Daniel Coto',
        friends: 3,
        age: 100,
        weight: 140,
      },
    ];
    fixture.detectChanges();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call to draw chart after view init', () => {
    expect(drawChartSpy).toHaveBeenCalled();
  });

  it('should not call update chart on init', () => {
    expect(updateChartSpy).not.toHaveBeenCalled();
  });

  describe('on changes', () => {
    it('should redraw chart on change of xAxis', () => {
      let testChanges: SimpleChanges = {
        xAxis: {
          currentValue: 'friends',
          previousValue: 'age',
          firstChange: false,
          isFirstChange: () => false,
        },
      };

      component.ngOnChanges(testChanges);
      fixture.detectChanges();
      expect(drawChartSpy).toHaveBeenCalled();
    });

    it('should redraw chart on change of yAxis', () => {
      let testChanges: SimpleChanges = {
        yAxis: {
          currentValue: 'friends',
          previousValue: 'weight',
          firstChange: false,
          isFirstChange: () => false,
        },
      };

      component.ngOnChanges(testChanges);
      fixture.detectChanges();
      expect(drawChartSpy).toHaveBeenCalled();
    });

    it('should update chart chart on data change', () => {
      let testChanges: SimpleChanges = {
        data: {
          currentValue: [
            {
              name: 'Daniel Coto',
              friends: 3,
              age: 100,
              weight: 140,
              id: '124',
            },
          ],
          previousValue: [],
          firstChange: false,
          isFirstChange: () => false,
        },
      };

      component.ngOnChanges(testChanges);
      fixture.detectChanges();
      expect(drawChartSpy).toHaveBeenCalledTimes(1); //Initial call from Init
      expect(updateChartSpy).toHaveBeenCalled();
    });
  });
});
