import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
/* import { Observable } from '../../../node_modules/rxjs';
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userPerson: User = new User();
  registerUser: User = new User();

  product: Product = new Product();
  readonly GET_USERS = 'http://localhost:1337/getallusers';
  readonly LOGIN_USER = 'http://localhost:1337/loginUser/';
  readonly GET_CLOTHES_PRODUCTS = 'http://localhost:1337/getClothesProductsById/';
  readonly GET_TOYS_PRODUCTS = 'http://localhost:1337/getToysProductsById/';
  readonly ADD_PRODUCT = 'http://localhost:1337/addProduct';
  readonly DELETE_PRODUCT = 'http://localhost:1337/removeProduct/';
  readonly UPDATE_PRODUCT = 'http://localhost:1337/updateProduct';
  readonly GET_USER_BY_EMAIL = 'http://localhost:1337/getUserByEmail/';
  readonly ADD_USER= 'http://localhost:1337/addUser';

  constructor(private http: HttpClient) {

  }

  getUsers() {
    return this.http.get(this.GET_USERS);
  }


  login(email, password){
   return this.http.get(this.LOGIN_USER+email+'/'+password);
  }

  getProductsById(idUser){
    return this.http.get(this.GET_CLOTHES_PRODUCTS+idUser);

  }

  getToysProductsById(idUser){
    return this.http.get(this.GET_TOYS_PRODUCTS+idUser);
  }

  addProduct(product){
    return this.http.post(this.ADD_PRODUCT, product);
  }

  removeProduct(idProduct){
    return this.http.delete(this.DELETE_PRODUCT+idProduct);
  }

  updateProduct(product){
    return this.http.put(this.UPDATE_PRODUCT, product);
  }

  getUserByEmail(email){
    return this.http.get(this.GET_USER_BY_EMAIL+email);
  }

  addUser(user){
    return this.http.post(this.ADD_USER, user);
  }
}
