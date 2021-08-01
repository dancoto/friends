import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScatterPlotComponent } from './scatter-plot.component';
describe('ScatterPlotComponent', () => {
  let component: ScatterPlotComponent;
  let fixture: ComponentFixture<ScatterPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScatterPlotComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterPlotComponent);
    component = fixture.componentInstance;
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
