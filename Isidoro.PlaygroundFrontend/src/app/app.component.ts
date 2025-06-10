import { Component, OnInit, ViewChild, WritableSignal } from '@angular/core';
import { Table } from 'primeng/table';
import { ProductService } from '../services/product.service';
import { GetProductResponse } from '../models/product/get.product.response';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateProductRequest } from '../models/product/create.product.request';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  products!: WritableSignal<GetProductResponse[]>;
  
  @ViewChild('dt') dt!: Table;

  exportColumns!: ExportColumn[];

  cols!: Column[];
  title = 'Isidoro.PlaygroundFrontend';

  visible: boolean = false;

  nameFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl<string | null>(null);
  priceFormControl = new FormControl<number>(0, [Validators.required, Validators.min(0)]);
  formGroup = new FormGroup([this.nameFormControl, this.descriptionFormControl, this.priceFormControl]);

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.products = this.productService.products;
    this.getProduct();
  }

  getProduct(){
    this.productService.getAll().subscribe(response => {
      this.productService.products.set(response.products);
      console.log(this.products());
    });
  }

  submit(){
    var request = new CreateProductRequest();
    request.name = this.nameFormControl.value!;
    request.description = this.descriptionFormControl.value ?? '';
    request.price = this.priceFormControl.value!;

    this.productService.create(request).subscribe(response => {
      if (response.isSuccess){
        this.getProduct();
        this.visible = false;
        this.formGroup.reset();
      }
    }, error => {
      console.error('Error creating product:', error);
    });

  }

  openNew(){
    this.visible = true;
  }

  deleteSelectedProducts(){

  }

  exportCSV(){

  }

}

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}
