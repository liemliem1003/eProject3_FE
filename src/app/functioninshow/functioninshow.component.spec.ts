import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctioninshowComponent } from './functioninshow.component';

describe('FunctioninshowComponent', () => {
  let component: FunctioninshowComponent;
  let fixture: ComponentFixture<FunctioninshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctioninshowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctioninshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
