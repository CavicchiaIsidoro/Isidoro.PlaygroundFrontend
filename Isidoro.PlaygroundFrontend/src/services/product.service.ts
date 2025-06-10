import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { GetProductsResponse } from "../models/product/get.products.response";
import { GetProductResponse } from "../models/product/get.product.response";
import { environment } from "../environments/environment.development";
import { CreateProductRequest } from "../models/product/create.product.request";
import { CreateProductResponse } from "../models/product/create.product.response";

@Injectable({providedIn: 'root'})
export class ProductService {
    public products = signal<GetProductResponse[]>([]);

    constructor(private http: HttpClient){}

    getAll(){
        return this.http.get<GetProductsResponse>(environment.apiUrl + '/product');
    }

    create(request: CreateProductRequest){
        return this.http.post<CreateProductResponse>(environment.apiUrl + '/product', request);
    }
}