import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  event: Event;


  onSearch(value: string) {
    console.log('the parent get value: ' + value);
  }
}
