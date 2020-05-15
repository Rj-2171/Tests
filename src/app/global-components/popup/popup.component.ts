import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
// import { EventEmitter } from 'events';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, OnChanges {
  @Input('message') message: string = '';
  @Input('status') status: boolean = false;
  @Input('type') type: string = 'error';
  @Output('close') close: EventEmitter<boolean> = new EventEmitter<boolean>();

  public color: string = 'indianred';
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if(this.type.toLowerCase() === 'error'){
      this.color = 'indianred';
    }
    if(this.type.toLowerCase() === 'success'){
      this.color = 'lightgreen';
    }
  }

  public closePopup() {
    this.close.emit(false);
    this.status = false;
  }

}
