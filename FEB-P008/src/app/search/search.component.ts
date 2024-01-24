// search.component.ts

import { Component } from '@angular/core';
import { WikiService } from '../wiki.service';

interface Result {
pageid: any;
  title: string;
  snippet: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  term = '';
  results: Result[] = [];

  constructor(private wiki: WikiService) { }

  search() {
    this.wiki.search(this.term).subscribe(data => {
      this.results = data.query.search;
    });
  }
}
