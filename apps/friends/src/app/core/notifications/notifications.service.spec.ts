import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SNACKBAR_CONFIG } from './notifications.constants';
import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, NoopAnimationsModule],
    });
    service = TestBed.inject(NotificationsService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show notification', () => {
    jest.spyOn(snackBar, 'open');
    service.showNotification('test');
    expect(snackBar.open).toHaveBeenCalledWith('test', '', SNACKBAR_CONFIG);
  });
});
