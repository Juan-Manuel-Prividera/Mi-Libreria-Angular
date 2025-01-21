import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCalificationComponent } from './book-calification.component';

describe('BookCalificationComponent', () => {
  let component: BookCalificationComponent;
  let fixture: ComponentFixture<BookCalificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCalificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCalificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
