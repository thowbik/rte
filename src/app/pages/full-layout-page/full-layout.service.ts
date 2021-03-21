import { Injectable } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class FullLayoutService {
  private apiKey = environment.googleApiKey;
  constructor(private dataService: DataService, private http: HttpClient) { };

  getLatLong(searchLocation) {
    debugger;
    // return this.http.get<any[]>('https://geocode.search.hereapi.com/v1/geocode?q=' + searchLocation + '&apikey=' + this.apiKey,{headers: headers});
    return this.http.get<any[]>('https://maps.googleapis.com/maps/api/geocode/json?address='+searchLocation+'&key='+this.apiKey);
  }
  getAddress(lat, lng) {
    // const headers = new HttpHeaders(
    //   {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   });
    return this.http.get<any[]>('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key='+this.apiKey);
    // return this.http.get<any[]>('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat='+lat+'&lon='+lng);
    // return this.http.get<any[]>('https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=' + lat + ',' + lng + '&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=' + this.apiKey);
  }

  getDropdownList(refresh) {
    return this.dataService.getData('/api/index.php/RTE_Retreival', true);
  }
  getApplicantData(registerNo)
  {
    return this.dataService.getData('/api/index.php/ResumeAppliData?reg_id='+registerNo,true);
  }

  getPersonalDetails(data) {
    debugger;
    return this.dataService.post('/api/index.php/Save_perosnalDet', data);
  }

  getParentDetails(data) {
    debugger;
    return this.dataService.post('/api/index.php/Save_parentDet', data);
  }

  getAddressDetails(data) {
    return this.dataService.post('/api/index.php/Save_addressDet', data);
  }
  getStudentDocuments(data)
  {
    return this.dataService.post('/api/index.php/Save_StudRTE',data); 
  }
  getRTEIntakeCapacity(refresh) {
    return this.dataService.getData('/api/index.php/StudentRTE_Allocation', true);
  }
  getRTEIntakeDistwise(district_id) {  
      return this.dataService.getData('/api/index.php/StudentRTE_BySchoolAlloc/?district_id=' +district_id, false);
  }
  getschList(registerNo) {
    return this.dataService.getData('/api/index.php/GoogleMap/?register_no=' +registerNo, true);
  }
  getSelectedschList(registerNo) {
    return this.dataService.getData('/api/ResumeSchlList?reg_id=' +registerNo, true);
  }

  saveSelectedSchools(data)
  {
    return this.dataService.post('/api/index.php/School_list_det',data); 
  }
  resumeApplication(data)
  {
    debugger;
    return this.dataService.post('/api/index.php/ResumeAppliValid',data); 
  }
  getStudentListData(registerNo)
  {
    return this.dataService.getData('/api/index.php/RtePdf_reg/?register_no='+registerNo,true);
  }
  saveFinalSubmit(data)
  {
    return this.dataService.post('/api/index.php/FinalSubmit',data); 
  }
}
