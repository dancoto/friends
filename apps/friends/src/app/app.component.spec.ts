import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  @Component({ selector: 'dancoto-toolbar', template: '' })
  class ToolbarComponent {}

  @Component({ selector: 'dancoto-friends-container', template: '' })
  class FriendsContainerComponent {}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, ToolbarComponent, FriendsContainerComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
