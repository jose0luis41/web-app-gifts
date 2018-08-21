import { Component, OnInit, NgModule } from '@angular/core';
import { ManageDataService } from '../../services/manage-data.service';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule, MatCardModule, MatInput, MatFormField, MatSelect, MatOption, MatButton, MatCard, MatCardContent, MatSnackBarModule, MatSnackBar } from '@angular/material';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

@NgModule({
  declarations: [],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,

  ],
  exports: [
    MatInput,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    MatCard,
    MatCardContent,
  ],
  providers: [],

})
export class RegisterComponent implements OnInit {

  formGroupObject: FormGroup;
  submitted = false;
  loadingLogin = false;
  existAccountUser;
  public genders = [{ 'value':0, 'name': 'Male' }, {'value':1, 'name': 'Female' }];
  public types = [{ 'name': 'Chief' }, {'name': 'Employee' }];

  constructor(private router: Router, private manageService: ManageDataService, private userService: LoginService, public snackBar: MatSnackBar, private fb: FormBuilder) { }

  ngOnInit() {

    this.manageService.changeLabel('Register');


    this.formGroupObject = this.fb.group({
      
      'emailForm': ['', [Validators.required, Validators.email,Validators.maxLength(59)]],
      'passwordFrom': ['', [Validators.required, Validators.maxLength(59)]],
      'nameForm': ['', [Validators.required, Validators.maxLength(59)]],
      'lastNameForm': ['', [Validators.required, Validators.maxLength(59)]],
      'typeForm': ['', Validators.required],
      'genderForm': ['', Validators.required],


    });

  }

  get formGr() {
    return this.formGroupObject.controls;
  }

  onSubmit(userRegisterForm: NgForm){
    this.submitted = true;

    if(this.formGroupObject.valid){
      this.getUserByEmail(this.userService.registerUser.Email);
    }else{
      console.log('error')
    }
  }

   getUserByEmail(email){
    this.loadingLogin = true;
    this.userService.getUserByEmail(email).subscribe(
      response => {
        this.existAccountUser = response[0];

        if(this.existAccountUser !== undefined && this.existAccountUser !== null){
          this.loadingLogin = false;
          this.snackBar.open('There is an user with email: '+email, 'OK', {
            duration: 5000,
          });

        }else{
            this.addNewUser(this.userService.registerUser);          
        }
        //this.manageService.changeValueButton(false);
        //this.router.navigate(['/products']);
        //this.loadingLogin = false;

    },
    error => {
      console.log(error);
    }
    );
  }

  addNewUser(user){
    this.userService.addUser(user).subscribe(
      response =>{
        if(response){
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.manageService.changeValueButton(false);
          this.router.navigate(['/products']);
          this.userService.registerUser = new User();

          this.snackBar.open('¡Welcome! ¡Register successuful!', 'OK', {
            duration: 6000,
          });
        }
      },
      error =>{
        console.log(error);
      }
    );
  }


}
