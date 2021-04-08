import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-error-dashboard',
  templateUrl: './error-dashboard.component.html',
  styleUrls: ['./error-dashboard.component.css']
})
export class ErrorDashboardComponent implements OnInit {

  constructor(public auth:AuthService) { }

  ngOnInit(): void {
  }

}
