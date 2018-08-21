import { NgModule } from "../../node_modules/@angular/core";
import { RouterModule, Routes } from "../../node_modules/@angular/router";
import { LoginComponent } from "./toolbar/login/login.component";
import { ProductsComponent } from "./toolbar/products/products.component";
import { RegisterComponent } from "./toolbar/register/register.component";

const routes: Routes = [
        {path:'', redirectTo:'/', pathMatch: 'full',},
        {path:'products', component: ProductsComponent},
        {path:'register', component: RegisterComponent},

        {path:'', component: LoginComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{
}

export const routingComponents = [LoginComponent, ProductsComponent, RegisterComponent];