import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatSnackBar, MatSnackBarModule, MatCardModule, MatCardContent, MatCard, MatPaginator, } from '@angular/material';
import { LoginService } from '../../services/login.service';
import { ManageDataService } from '../../services/manage-data.service';
import { MatIconModule, MatIcon, MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [

    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule


  ],
  exports: [
    MatIcon,
    MatCard,
    MatCardContent,
    MatPaginator
  ],
  providers: [
  ],
  entryComponents: [DialogComponent]

})
export class ProductsComponent implements OnInit {

  displayedColumns = ['Name', 'Description', 'Cost', 'action'];
  listClothesProducts;
  listToysProducts;
  currentUser;
  currentTitle;
  getCurrentUser;
  isMale = true;
  
  @ViewChild(MatPaginator) paginatorToys: MatPaginator;
  @ViewChild(MatPaginator) paginatorClothes: MatPaginator;


  constructor(private productService: LoginService, private manageService: ManageDataService, private dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {

    this.manageService.changeLabel('Welcome to your App Web Gifts');
    //this.manageService.changeValueButton(false);
  
    this.getCurrentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.getCurrentUser.Gender === 1) {
      this.isMale = false;

    }
    this.currentUser = this.getCurrentUser.Name + ' ' + this.getCurrentUser.LastName;
    if (this.getCurrentUser && this.getCurrentUser.idUsers) {
      this.loadProductList(this.getCurrentUser.idUsers);
    } else {
      this.getUserByEmail(this.getCurrentUser.Email);
      //this.router.navigate(['/login']);
    }

  }


  loadProductList(idUsers){
    this.productService.getProductsById(idUsers).subscribe(
      response => {
        this.listClothesProducts = response;
        this.listClothesProducts.paginator = this.paginatorClothes;
      },
      error => {
        console.log(error);
      });


    this.productService.getToysProductsById(idUsers).subscribe(
      response => {
        this.listToysProducts = response;
        this.listToysProducts.paginator = this.paginatorToys;

      },
      error => {
        console.log(error);
      }
    );
  }



  removeProduct(product){
    this.productService.removeProduct(product.idProducts).subscribe(
      response => {
        
        this.loadProductList(this.getCurrentUser.idUsers);
      },
      error => {
        console.log(error);
      });
  }

  openDialog(currentProduct) {
    const dialogConfig = new MatDialogConfig();

    if(currentProduct){
      'current product'
      dialogConfig.data = {
        product: currentProduct,
        type: this.getCurrentUser.Type,
      };
    }else{
      dialogConfig.data = {
        type: this.getCurrentUser.Type,
      };
    }
    

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    //const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          this.loadProductList(this.getCurrentUser.idUsers);
          this.dialog.closeAll();

          var message = 'Product added successfully';
          if(!data.added){
            message = 'Product updated successfully';
          }
          this.snackBar.open(message, 'OK', {
            duration: 6000,
          });

        }else{
          this.dialog.closeAll();
        }
      }
      
    );
  }

  getUserByEmail(email){

    this.productService.getUserByEmail(email).subscribe(
      response => {

        if(response[0] !== undefined && response[0] !== null){
          localStorage.setItem('currentUser', JSON.stringify(response[0]));
          this.loadProductList(response[0].idUsers);

        }else{
        }
      
    },
    error => {
      console.log(error);
    }
    );
  }

}
