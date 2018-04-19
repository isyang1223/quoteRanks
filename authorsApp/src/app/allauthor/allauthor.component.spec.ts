import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllauthorComponent } from './allauthor.component';

describe('AllauthorComponent', () => {
  let component: AllauthorComponent;
  let fixture: ComponentFixture<AllauthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllauthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllauthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
