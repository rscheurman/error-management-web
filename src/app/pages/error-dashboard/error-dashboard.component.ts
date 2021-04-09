import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-error-dashboard',
  templateUrl: './error-dashboard.component.html',
  styleUrls: ['./error-dashboard.component.css']
})
export class ErrorDashboardComponent implements OnInit {
  projects:Observable<any[]> = this.firestore.getProjects()
  projectErrors:Observable<any[]> = this.firestore.getErrors()

  constructor(public auth:AuthService, public firestore:FirestoreService) { 
  }

  ngOnInit(): void {
  }

  getErrors() {
  }


}
