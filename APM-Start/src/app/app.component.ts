import { Component } from "@angular/core";

@Component({
  selector: "pm-root",
  template: `
    <nav class="navbar navbar-expand navbar-light bg-light">
      <h1 class="navbar-brand">{{pageTitle}}</h1>
      <ul class="nav nav-pills">
        <li><a class="nav-link" routerLink="/welcome">Home</a></li>
        <li><a class="nav-link" routerLink="/products">Product List</a></li>
      </ul>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  // templateUrl: "./app.component.html"
})
export class AppComponent {
  pageTitle: string = "Acme Product Management"
}