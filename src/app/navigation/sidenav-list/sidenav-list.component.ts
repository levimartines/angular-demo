import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {
  @Output() itemClicked = new EventEmitter<void>();

  constructor(
  ) {
  }

  onLogoutClick(): void {
    this.itemClicked.emit();
  }
}
