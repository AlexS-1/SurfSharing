import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseOffersComponent } from './browse-offers.component';

describe('BrowseOffersComponent', () => {
  let component: BrowseOffersComponent;
  let fixture: ComponentFixture<BrowseOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseOffersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
