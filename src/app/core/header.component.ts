import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FalconeHomeComponent } from '../home/falcone-home/falcone-home.component';

@Component({
  selector: 'app-header',
  template: `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <h1 class="header">Finding Falcone!</h1>
    <div class="collapse navbar-collapse my-lg-0" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
          <li class="nav-item">
              <a class="nav-link" href="#">Home </a>
          </li>
          <li class="nav-item">
              <a class="nav-link" (click)="reset()" href="#">Reset</a>
          </li>
      </ul>
    </div>
  </nav>
  `,
  styles: [
   `
   .header {
    width: 100%;
    text-align: center;
  }
  `
  ]
})
export class HeaderComponent implements OnInit {

  @ViewChild(FalconeHomeComponent, {static: true}) falcone: FalconeHomeComponent;

  constructor() { }

  ngOnInit(): void {
  }

  reset(){
    console.log(this.falcone.currentlySelectedPlanet)
    this.falcone.destinations.controls.forEach(control => {
      control['controls']['vehiclesList'].reset();
    })
  }

}
