import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/';

@Injectable({
  providedIn: 'root'
})
export class ManageDataService {

  private titleLabel = new BehaviorSubject<string>("Gift App Web");
  private hideButton = new BehaviorSubject<boolean>(true);

  currentLabel = this.titleLabel.asObservable();
  currentValueButton = this.hideButton.asObservable();

  constructor() { 
    console.log('OK')
  }

  changeLabel(label: string){
    this.titleLabel.next(label);
  }

  changeValueButton(hide: boolean){
    this.hideButton.next(hide);
  }
}
