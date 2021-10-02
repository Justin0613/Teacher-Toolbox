import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})

export class NavigationBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  OnNavigationButtonClick(buttonName: Number) {
    switch(buttonName)
    {
      case 0:
        console.log("ALPHA BUTTON PRESSED");
        break;
      case 1:
        console.log("BETA BUTTON PRESSED");
        break;
      case 2:
        console.log("GAMMA BUTTON PRESSED");
        break;
      case 3:
        console.log("DELTA BUTTON PRESSED");
        break;
      case 4:
        console.log("EPSILON BUTTON PRESSED");
        break;
    }
  }
}
