import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserSessionService } from './usersession.service';
import { DataService } from './data.service';
import { UserSession } from '../models/usersession';


import * as jwtDecode from 'jwt-decode';
import * as momenttz from 'moment-timezone';
import * as _ from 'lodash';

import 'rxjs/add/operator/map';
declare var require: any;
const timezone = require('../assets/timezones.json');

@Injectable()
export class AuthenticationService {

  private loginbaseUrl = environment.loginApiBaseUrl;
  private baseUrl = environment.apiBaseUrl;
  timeZones: any[];
  sessionData = new UserSession();
  schoolName: string;
  schoolTypeId: string;
  districtId: string;

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private sessionService: UserSessionService) {
    this.getTimeZones();
  }

  login(regId: number, password: string) {
    debugger;
 const data =   {"records":{"register_no": regId,"password": password
}}
    return this.http.post<any>(this.loginbaseUrl, data)
      .map(user => {
debugger;
        if (user && user.dataStatus) {
          // localStorage.setItem('token',user.records.token);
          const decodedToken = jwtDecode(user.records);
          debugger;
          this.sessionData.register_no = decodedToken['register_no'];
          this.sessionData.studentName = decodedToken['student_name'];
          this.sessionData.applicationStatus = decodedToken['appli_status'];
          this.sessionData.class = decodedToken['class'];
          this.sessionData.gender = decodedToken['gender'];
          this.sessionData.authToken = user.records;
          this.sessionService.create(this.sessionData);
         
        }
        return user;
      });
  }


  isAuthenticated() {
    return (!!this.sessionService.authToken());
    
  }

  getTimeZones() {
    this.timeZones = timezone.timeZone;
  }

  getBrowserTimeZone(): string {
    const zoneName = momenttz.tz.guess();
    const temptimezone = momenttz.tz(zoneName).zoneAbbr();
    const filterZone = this.timeZones.find(i => i.abbr === temptimezone);
    if (filterZone) {
      return filterZone.value;
    }
    return '';
  }

  clearCachedMenu() {
    this.dataService.clearCache();
  }

  clearSession() {
    this.sessionService.destroy();
    this.clearCachedMenu();
  }

  logOut() {
    this.clearCachedMenu();
    this.sessionService.destroy();
  }
}
