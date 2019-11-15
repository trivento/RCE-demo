import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Rijksmonument} from '../../models/rijksmonument.model';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  activeRijksmonument: BehaviorSubject<Rijksmonument> = new BehaviorSubject(null);

  constructor() { }
}
