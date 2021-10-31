import { Component, OnInit } from '@angular/core';
import { ISearchResultItem, SearchService } from 'app/core/services/search.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private _searchService: SearchService) { }

  ngOnInit() {
  }
}
