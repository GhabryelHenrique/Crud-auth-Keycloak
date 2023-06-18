import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SideBarComponent {
  menu = [
    {
      label: 'Home',
      path: '/home'
    },
    {
      label: 'Bancos',
      path: '/banks'
    },
  ]

  constructor(private readonly router: Router) {}

  redirectTo(route: string){
    this.router.navigate([route])
  }

}
