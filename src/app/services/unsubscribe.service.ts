import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable() // This service should be used with each component that needs to unsubscribe
export class UnsubscribeService extends Subject<void> implements OnDestroy {
  ngOnDestroy() {
    this.next();
    this.complete();
  }
}