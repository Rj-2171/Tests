import { ITestList } from './../../../interface/test.student.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { TestList } from 'src/interface/global.components.interface';
import { ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-test-list-global',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TestListComponentGlobal implements OnInit {
  @Input('test-list') testList: ITestList[] = [];
  @Input('is-student') isStudent: boolean = false;
  @Input('show-create-test') showCreateTest: boolean = false;
  @Output('createTest') createTestEmitter = new EventEmitter();
  @Output('startTest') startTestEmitter = new EventEmitter<ITestList>();

  constructor() { }

  ngOnInit() {
  }

  public showAlertMessage(message: String) {
    alert(message);
  }

  public createTest() {
    this.createTestEmitter.emit();
  }

  public startTest(test: ITestList) {
    this.startTestEmitter.emit(test);
  }


}
