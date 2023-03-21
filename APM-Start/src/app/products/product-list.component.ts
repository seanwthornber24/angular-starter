import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: "pm-products",
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list-component.css"]
})
export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle: string = "Products list"
    imageWidth: number = 50;
    imageMargin: number = 2;
    private _listFilter: string = ""
    filteredProducts: IProduct[] = [];
    products: IProduct[] = []
    errorMessage: string = "";
    sub!: Subscription;

    constructor(private productService: ProductService) {}

    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.performFilter()
        console.log("In setter: " + value)
    }

    performFilter(): IProduct[] {
        return this.products.filter((product: IProduct) => product.productName.toLowerCase().includes(this.listFilter.toLowerCase()))
    }

    showImg: boolean = false;

    toggleImage = (): void => {
        this.showImg = !this.showImg;
    }

    ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
            next: (products) => {
                this.products = products
                this.filteredProducts = this.products
            },
            error: (err) => this.errorMessage = err
        });
        console.log("In the onInit method!")
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe()
    }

    onRatingClicked(message: string): void {
        this.pageTitle = `Product List: ${message}`;
    }
}