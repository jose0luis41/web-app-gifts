import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {MatCommonModule} from '@angular/material/core';
import {MatToolbarRow, MatToolbar} from '@angular/material/toolbar';
import { MatIconModule, MatIcon, MatSnackBar, MatSnackBarModule } from '@angular/material';
import { ManageDataService } from '../services/manage-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

@NgModule({
  declarations: [
    MatToolbar, MatToolbarRow,
  ],
  imports: [
    MatCommonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  exports:[
    MatToolbar, MatToolbarRow, MatCommonModule, MatIcon
  ],
  providers: [],
})

export class ToolbarComponent implements OnInit {

  currentTitle;
  hideButton;

  constructor(private manageService: ManageDataService, private router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.manageService.currentLabel.subscribe(currentTitle => this.currentTitle = currentTitle);
    this.manageService.currentValueButton.subscribe(currentValue => this.hideButton = currentValue);

    var getCurrentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if(getCurrentUser){
      this.manageService.changeValueButton(false);
      this.router.navigate(['/products']);
    }else{
      this.router.navigate(['/']);
    }
  }

  logout(){
    this.manageService.changeValueButton(true);
    localStorage.setItem('currentUser', null);
    this.snackBar.open('Bye, ¡See you later!', 'OK', {
      duration: 4000,
    });
    this.router.navigate(['/']);

  }

}
