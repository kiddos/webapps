import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: string;
  home: boolean;

  constructor(private router: Router, private location: Location) {
    this.home = true;
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const r = this.router.routerState.snapshot.root.firstChild;
        this.title = r.data['title'];

        if (this.title !== "kiddo's webapps") {
          this.home = false;
        } else {
          this.home = true;
        }
      }
    });
  }

  back() {
    this.location.back();
  }
}
