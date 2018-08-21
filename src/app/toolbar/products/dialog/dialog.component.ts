import { Component, OnInit, NgModule, Inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatInputModule, MatFormFieldModule, MatInput, MatFormField, MatSelectModule, MatSelect } from "@angular/material";
import { LoginService } from '../../../services/login.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

@NgModule({
  declarations: [
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  exports:[
    MatInput,
    MatFormField,
    MatSelect,
  ],
  providers: [
  ],

})
export class DialogComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  type: string;
  invalidCost = false;
  addProduct = true;
  public topics = [{ 'name': 'Clothes' }, {'name': 'Toys' }];

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<DialogComponent>, private service: LoginService,  @Inject(MAT_DIALOG_DATA) data){
    console.log(data);
    this.type = data.type;

    if(data.product){
      this.addProduct = false;
      this.service.product.idProducts = data.product.idProducts;
      this.service.product.Name = data.product.Name;
      this.service.product.Description = data.product.Description;
      this.service.product.Cost = data.product.Cost;
      this.service.product.Type = this.type;
      this.service.product.Topic = data.product.Topic;

    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      'nameProduct': ['', [Validators.required, Validators.maxLength(59)]],
      'descriptionProduct': ['', [Validators.required, Validators.maxLength(99)]],
      'costProduct': ['', Validators.required],
      'topicProduct': ['', Validators.required],
    });
  }

  get formGr() {
    return this.form.controls;
  }

  save() {
    this.submitted = true;

    if(this.form.valid){
      if(this.addProduct){
        this.service.product.Type = this.type;
        this.service.addProduct(this.service.product).subscribe(
          response =>{
            if(response){
              this.service.product = new Product();

              var json = {
                status: true,
                added: true,
              };
              this.dialogRef.close(json);
            }
          },
          error =>{
            if(error.status === 400 && error.error.code === 'ER_WARN_DATA_OUT_OF_RANGE'){
              this.invalidCost = true;
            }
            
          }
        );
      }else{
        this.service.updateProduct(this.service.product).subscribe(
          response =>{
            if(response){
              this.service.product = new Product();
              var json = {
                status: true,
                added: false,
              };
              this.dialogRef.close(json);
            }
          },
          error =>{
            console.log(error);
            if(error.status === 400 && error.error.code === 'ER_WARN_DATA_OUT_OF_RANGE'){
              this.invalidCost = true;
            }
            
          }
        );
      }
      

    }else{
      console.log('Error');
    }
  }

  close() {
    this.service.product = new Product();
    this.dialogRef.close();
  }

}
