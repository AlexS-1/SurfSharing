import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOfferComponent } from './book-offer.component';

describe('BookOfferComponent', () => {
  let component: BookOfferComponent;
  let fixture: ComponentFixture<BookOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
