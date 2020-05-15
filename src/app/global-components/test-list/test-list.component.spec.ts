import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestListComponentGlobal } from './test-list.component';

describe('TestListComponent', () => {
  let component: TestListComponentGlobal;
  let fixture: ComponentFixture<TestListComponentGlobal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestListComponentGlobal]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestListComponentGlobal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
