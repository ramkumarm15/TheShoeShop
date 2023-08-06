import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Notify } from '../../Model/notify';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: DATA) {}

  ngOnInit(): void {}

  getClass() {
    const baseClass = 'alert alert-';
    return baseClass + this.data.type;
  }
}

export interface DATA {
  message: string;
  type: Notify;
}
