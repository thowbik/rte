import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { UserSession } from '../models/usersession';

@Injectable()

export class UserSessionService {

  session = new UserSession();
  localStorageSessionKey: string;

  constructor() {
    this.localStorageSessionKey = 'DOF-' + environment.apiBaseUrl + '-AuthData';
  }

  create(session: any) {// jshint ignore:line
    this.setLocalStorageProperties(session);
  }

  destroy() {// jshint ignore:line
    this.setLocalStorageProperties(new UserSession());
  }

  load() { // jshint ignore:line
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData;
  }

  authToken() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).authToken;
  }
  regId() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).register_no;
  }
  studentName() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).studentName; 
  }
  applicationStatus() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).applicationStatus; 
  }
  class() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).class; 
  }
  gender() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).gender; 
  }
 
  setLocalStorageProperties(session: any) {// jshint ignore:line
    debugger;
    localStorage.setItem(this.localStorageSessionKey, JSON.stringify(session));
  }

  getLocalStorageWithKey(key: any) {// jshint ignore:line
    return localStorage.getItem(key);
  }

  setLocalStorageWithKey(key: any, session: any) {// jshint ignore:line
    localStorage.setItem(key, JSON.stringify(session));
  }
}

