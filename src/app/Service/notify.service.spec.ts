import { TestBed, waitForAsync } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';
import { Notify } from '../Model/notify';
import { NotificationComponent } from '../shared/notification/notification.component';
import { NotifyService } from './notify.service';

describe('NotifyService', () => {
  let service: NotifyService;
  let snackbar: MatSnackBar;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MaterialModule],
      providers: [NotifyService, MatSnackBar],
    });
  }));

  beforeEach(() => {
    service = TestBed.inject(NotifyService);
    snackbar = TestBed.inject(MatSnackBar);
  });

  it('success() should call notify()', () => {
    spyOn(service, 'notify').and.callThrough();

    service.success('test message');

    expect(service.notify).toHaveBeenCalledWith('test message', Notify.SUCCESS);
  });

  it('info() should call notify()', () => {
    spyOn(service, 'notify').and.callThrough();

    service.info('test message');

    expect(service.notify).toHaveBeenCalledWith('test message', Notify.INFO);
  });

  it('warning() should call notify()', () => {
    spyOn(service, 'notify').and.callThrough();

    service.warning('test message');

    expect(service.notify).toHaveBeenCalledWith('test message', Notify.WARNING);
  });

  it('error() should call notify()', () => {
    spyOn(service, 'notify').and.callThrough();

    service.error('test message');

    expect(service.notify).toHaveBeenCalledWith('test message', Notify.DANGER);
  });

  it('notify() should call openFromComponent()', () => {
    spyOn(snackbar, 'openFromComponent').and.callThrough();

    service.notify('test message', Notify.INFO);

    expect(snackbar.openFromComponent).toHaveBeenCalledWith(
      NotificationComponent,
      {
        duration: 3 * 1000,
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
        data: {
          message: 'test message',
          type: Notify.INFO,
        },
      }
    );
  });
});
