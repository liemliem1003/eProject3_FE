import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowClaimdetailComponent } from './show-claimdetail.component';

describe('ShowClaimdetailComponent', () => {
  let component: ShowClaimdetailComponent;
  let fixture: ComponentFixture<ShowClaimdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowClaimdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowClaimdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
