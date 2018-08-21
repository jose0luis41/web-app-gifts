import { Component, OnInit, NgModule, Input } from '@angular/core';
import { MatInputModule, MatFormFieldModule, MatFormField, MatInput, MatOption, MatOptionModule, MatNativeDateModule, MatCheckboxModule, MatCheckbox, MatButtonModule, MatButton, MatSnackBar, MatSnackBarModule, MatCardModule, MatCard, MatCardContent, MatFormFieldControl, MatSelectModule, MatSelect, MatProgressBar } from '@angular/material';
import { NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';

import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ManageDataService } from '../../services/manage-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@NgModule({
  declarations: [],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,

  ],
  exports: [
    MatInput,
    MatFormField,
    MatSelect,
    MatOption,
    MatCheckbox,
    MatButton,
    MatCard,
    MatCardContent,
  ],
  providers: [],

})

export class LoginComponent implements OnInit {

  formGroupObject: FormGroup;
  submitted = false;
  loadingLogin = false;
  currentTitle;
  constructor(private router: Router, private manageService: ManageDataService, private userService: LoginService, public snackBar: MatSnackBar, private fb: FormBuilder) { }

  ngOnInit() {

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser !== null && currentUser !== undefined){
      this.router.navigate(['/products']);
    }else{
      this.manageService.changeLabel('Gift App Web');
      this.router.navigate(['/']);
    }

    this.formGroupObject = this.fb.group({
      
      'emailForm': ['', Validators.email],
      'passwordFrom': ['', Validators.required],

    });
  }

  openSnackBar(message, value) {

    var currentMessaResponse = 'OK'
    if(!value){
      currentMessaResponse = 'ERROR'
    }
      this.snackBar.open(message, currentMessaResponse, {
        duration: 4000,
      });

  }

  get formGr() {
    return this.formGroupObject.controls;
  }

  onSubmit(userForm: NgForm) {
    this.submitted = true;
    this.loadingLogin = true;
    //console.log(this.userService.userPerson);
    if (this.formGroupObject.valid) {
      this.userService.login(this.userService.userPerson.Email,this.userService.userPerson.Password).subscribe(
        response => {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.userService.userPerson.Email = '';
          this.userService.userPerson.Password = '';
          this.manageService.changeValueButton(false);
          this.snackBar.open('Hi, ¡Welcome back!', 'OK', {
            duration: 5000,
          });
      
          this.router.navigate(['/products']);
          this.loadingLogin = false;

      },
      error => {
        if(error.error === 'There is an error with the password'){
          this.openSnackBar('Incorrect password',false);

        }else if(error.error === 'User is not registered'){
          this.openSnackBar('User '+this.userService.userPerson.Email+' is not registered',false);

        }else{
          this.openSnackBar('Unexpected error',false);

        }
          this.loadingLogin = false;

      }
      );
      
    } else {
      this.loadingLogin = false;
      this.openSnackBar('Errors in the form',false);
    }


  }

}
