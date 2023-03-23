import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  pageTitle: string = "Product Detail";
  product: IProduct | undefined;
  sub!: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.pageTitle += `: ${id}`
    this.sub = this.productService.getProducts().subscribe({
      next: (products) => {
        let productToDisplay = products.filter((product) => product.productId === id)[0];
        this.product = productToDisplay;
        console.log(this.product)
      },
      error: (err) => console.error(err)
    })
  }

  onBack(): void {
    this.router.navigate(["/products"]);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
