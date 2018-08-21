import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from './toolbar/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule } from '@angular/material';

import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './toolbar/products/products.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { LoginService } from './services/login.service';
import { ManageDataService } from './services/manage-data.service';
import { DialogComponent } from './toolbar/products/dialog/dialog.component';
import { RegisterComponent } from './toolbar/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    ProductsComponent,
    routingComponents,
    DialogComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToolbarComponent,
    LoginComponent,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AppRoutingModule,
    MatDialogModule
  ],
  exports:[

  ],
  providers: [LoginService, ManageDataService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]

})
export class AppModule { }
