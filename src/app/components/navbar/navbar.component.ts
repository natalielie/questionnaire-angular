import { Component } from '@angular/core';
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
export class NavbarComponent {
  constructor(private router: Router) {}

  goToManagementPage(): void {
    this.router.navigate([managementPath]);
  }

  goCreatePage(): void {
    this.router.navigate([createPath]);
  }

  goToQuestionnaireListPage(): void {
    this.router.navigate([questionnaireListPath]);
  }
}
