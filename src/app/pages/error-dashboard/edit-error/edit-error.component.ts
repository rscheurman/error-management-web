import { Component, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/core/services/firestore.service';

@Component({
  selector: 'app-edit-error',
  templateUrl: './edit-error.component.html',
  styleUrls: ['./edit-error.component.css']
})

export class EditErrorComponent implements OnInit {
  escalateStatus?:boolean;
  unixTsFetch?:any;
  projectFetch?:any;
  errorTypeFetch?:any;

  container?: string
  emailNotifState?: boolean
  errorMessage?:string
  errorType?:string
  insideFunction?:string
  timeStamp?:string
  unixTs?:number
  userEmail?:string
  

  constructor(public firestore:FirestoreService, private route: ActivatedRoute, private router: Router) { 
  }

  fetchErrorDetails(project:string, unixTs:number, errorType:string) {
    var errorObs:Observable<any>;
    errorObs = this.firestore.getError(project, unixTs, errorType)
    errorObs.subscribe(x => {      
      this.container = x.container;
      this.emailNotifState = x.emailNotifState
      this.errorMessage = x.errorMessage
      this.errorType = x.errorType
      this.insideFunction = x.insideFunction
      this.timeStamp = x.timeStamp
      this.unixTs = x.unixTs
      this.userEmail = x.userEmail
    })
  }

  
  
  ngOnInit(): void {
    this.escalateStatus = false;
    this.unixTsFetch = this.route.snapshot.params['id'],
    this.projectFetch = this.route.snapshot.params['project']
    this.errorTypeFetch = this.route.snapshot.params['errorType']
    this.fetchErrorDetails(this.projectFetch, this.unixTsFetch, this.errorTypeFetch)
  }

  changeEscalateStatus() {
    if(this.escalateStatus === true) {
      console.log('changed status')
      this.escalateStatus = false;
    } else if(this.escalateStatus === false) {
      console.log('changed status')
      this.escalateStatus = true;
    }
  }

  deleteError() {
    var answer = confirm('Are you sure?')
    if(answer) {
      this.firestore.deleteError(this.errorTypeFetch, this.unixTsFetch, this.projectFetch)
      this.router.navigate(['dashboard'])
    } else {
      // Clicked cancel or exited 
    }
  }

  updateError() {
    
  }


}
