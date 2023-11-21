import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  createPath,
  managementPath,
  questionnaireListPath,
} from 'src/app/shared/globals';

/**
 * a component of the navbar for all pages
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  // goToUsers(): void {
  //   this.router.navigate([dashboardPath], { queryParamsHandling: 'preserve' });
  // }

  goToManagementPage(): void {
    this.router.navigate([managementPath]);
  }

  goCreatePage(): void {
    this.router.navigate([createPath]);
  }

  goToQuestionnaireListPage(): void {
    this.router.navigate([questionnaireListPath]);
  }

  logout(): void {
    localStorage.clear();
  }
}
