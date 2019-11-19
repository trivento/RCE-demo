import { Injectable, EventEmitter } from '@angular/core';

export enum SCREEN_SIZE {
  MOBILE = 0,
  TABLET = 1,
  DESKTOP = 2
}
@Injectable({
  providedIn: 'root'
})
export class GlobalFunctionsService {
  public detectedScreenSize: EventEmitter<SCREEN_SIZE>;

  constructor() {
    this.detectedScreenSize = new EventEmitter();
  }

  detectScreenSize() {
    let screenSize = SCREEN_SIZE.DESKTOP;
    if (window.matchMedia('(max-width: 700px)').matches) {
      screenSize = SCREEN_SIZE.MOBILE;
    } else if (window.matchMedia('(max-width: 1024px)').matches) {
      screenSize = SCREEN_SIZE.TABLET;
    }
    this.detectedScreenSize.emit(screenSize);
    return screenSize;
  }
}
