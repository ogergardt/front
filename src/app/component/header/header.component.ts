import {Component, OnInit} from '@angular/core';
// import { SearchInputComponent } from '../search-input/search-input.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']

})

export class HeaderComponent implements OnInit {
  title = 'job';

  constructor() {


  }

  ngOnInit() {
  }
}
