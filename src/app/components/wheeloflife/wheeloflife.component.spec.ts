import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WheeloflifeComponent } from './wheeloflife.component';

describe('WheeloflifeComponent', () => {
  let component: WheeloflifeComponent;
  let fixture: ComponentFixture<WheeloflifeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WheeloflifeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WheeloflifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
