import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-success',
  template: `
  <div class="bgimg">
  <div class="topleft">
    
  </div>
  <div *ngIf="success" class="middle">
    <h1>SUCCESS! Congratulations on Finding Falcone</h1>
    <hr>
    <p>Time taken: {{timeTaken}}</p>
    <p>Planet Found: {{planet}}</p>
  </div>
  <div *ngIf="!success" class="middle">
    <h1>SORRY! Not able to Find Falcone</h1>
    <hr>
    <p>Time wasted: {{timeTaken}}</p>
    <p>Planet Found: <img src="../../assets/smiley.png" alt="Girl in a jacket" width="50" height="60"></p>
  </div>
  <div class="bottomleft">
    <button [routerLink]="['/']">Start Again</button>
  </div>
</div>
  `,
  styles: [
    `
    .bgimg {
       height: 100%;
      background-position: center;
      background-size: cover;
      position: relative;
      font-family: "Courier New", Courier, monospace;
      font-size: 25px;
      padding-top: 40%
    }
    
    .topleft {
      position: absolute;
      top: 0;
      left: 16px;
    }
    
    .bottomleft {
      position: absolute;
      top: 70%;
      left: 45%;
    }
    
    .middle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }
    
    hr {
      margin: auto;
      width: 40%;
    }
    `
  ]
})
export class SuccessComponent implements OnInit {
  planet;
  timeTaken;
  success;
  constructor(private route: ActivatedRoute) {
    this.route.params.forEach((params: Params) => {
      this.planet = params['planet'] ?? params['planet']
      this.timeTaken = params['timeTaken'] ?? params['timeTaken']
      this.success = params['success'] =='true' ? true : false
     console.log(params)
  });
   }

  ngOnInit(): void {
  }

}
