import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <footer id="footer" class="bg-light">@Copyright - v.h.a</footer>
  `,
  styles: [
    `
    #footer {
      position: fixed;
      height: 30px;
      bottom: 0px;
      left: 0px;
      right: 0px;
      margin-bottom: 0px;
      text-align: center;
  }
    `
  ],
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
