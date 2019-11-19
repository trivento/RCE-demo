import { ZoomableDirective } from './zoomable.directive';
import { ElementRef } from '@angular/core';

describe('ZoomableDirective', () => {
  it('should create an instance', () => {
    const directive = new ZoomableDirective(null, null);
    expect(directive).toBeTruthy();
  });
});
