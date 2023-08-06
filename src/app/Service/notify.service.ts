import { Injectable } from '@angular/core';
import { duration, Notify } from '../Model/notify';
import { NotificationComponent } from '../shared/notification/notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(private _notify: MatSnackBar) {}

  notify(message: string, type: Notify): void {
    this._notify.openFromComponent(NotificationComponent, {
      duration: duration * 1000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      data: {
        message,
        type,
      },
    });
  }

  success(message: string) {
    this.notify(message, Notify.SUCCESS);
  }

  info(message: string) {
    this.notify(message, Notify.INFO);
  }

  warning(message: string) {
    this.notify(message, Notify.WARNING);
  }

  error(message: string) {
    this.notify(message, Notify.DANGER);
  }
}
