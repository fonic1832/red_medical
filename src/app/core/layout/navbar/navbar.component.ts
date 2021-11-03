import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'ae-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(@Inject(DOCUMENT) private _document: Document) { }

  public toggleMenu() {
    let sidebar: HTMLElement = this._document.getElementById('app_sidebar');
    sidebar.classList.contains('sidebar--left--mobile--open')
      ? sidebar.classList.remove('sidebar--left--mobile--open')
      : sidebar.classList.add('sidebar--left--mobile--open');
  }
}
