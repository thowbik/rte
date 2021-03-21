
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var L: any;declare var L: any;
import { icon, latLng, marker, polyline, tileLayer,Marker } from 'leaflet';
import { Router, ActivatedRoute } from '@angular/router';
import {MessageService} from 'primeng/api';
import { FullLayoutService } from '../full-layout.service';
import { UserSessionService } from 'src/services/usersession.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-reg-address',
  templateUrl: './reg-address.component.html',
  styleUrls: ['./reg-address.component.scss'],
  providers: [MessageService]
})
export class RegAddressComponent implements OnInit {
  map: any;
  mapview: any = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', { maxZoom: 21, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] });
  terrainview: any = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', { maxZoom: 21, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] });
  satelliteview: any = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', { maxZoom: 21, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] });
  location: any={};
  public latitude: any;
  public longititude: any;
  markers: any;
  markerImage: any;
  test1: any;
  address: any;
  // markerInstance: Marker;


  addressDetailsForm: FormGroup;
  districtList: any[]=[];
  districtDetails: any;
  accept_types:any;
  communtysec: any = { result: '' };
  submitted: boolean;
  isAddressNotFound: boolean = false;
  routeData:any;
  catvalue: any;
  display: boolean = false;
  appvalue: any
  registerNo: number;
  applicantDetails: any;
  logoutdisplay: boolean = false;
  isAllowedToEdit: boolean = false;
  cateId :any;

  
  constructor(public alertService: AlertService,
    public contentService: FullLayoutService,
    private messageService: MessageService,
    public router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userSessionService: UserSessionService,
    private authService : AuthenticationService,
    private navigationService: NavigationService,
    private el: ElementRef) { 
      this.routeData = this.route.snapshot;
    //  this.catvalue = this.routeData.queryParams.categoryvalue;
      this.registerNo = this.userSessionService.regId();
    }

  ngOnInit() {
    this.initialValidator();
    this.getDropdownValues();
   this.initializeMap();
    this.getApplicantDetails();
  }
  initialValidator() {
    this.addressDetailsForm = this.fb.group({
      'address': new FormControl('', Validators.required),
      'pincode': new FormControl('', Validators.required),
      'district_id': new FormControl('', Validators.required),
      'map_address': new FormControl('', Validators.required),
    });
  }
  getApplicantDetails() {
    debugger;
    this.contentService.getApplicantData(this.registerNo).subscribe((res) => {
      this.applicantDetails = res.result;
      this.catvalue =this.applicantDetails['app_category'];
      this.addressDetailsForm.patchValue(this.applicantDetails);
      this.latitude = this.applicantDetails['latitude'];
      this.longititude = this.applicantDetails['longitude'];
      this.isAllowedToEdit = this.applicantDetails['appli_status'] != 0 ? true : false;
    });
}
  getDropdownValues() {
    this.contentService.getDropdownList(true).subscribe((result) => {
      debugger
      this.communtysec = result;
      debugger;
      this.districtList = this.communtysec['district'].map(item => { return { 
        label: item.district_name, 
        value :item.district_id
      }});
    });
  }
  showConfirmation()
  {
    this.logoutdisplay = true;
  }
  onLogout() {
    this.authService.logOut();
    this.navigationService.goToHome();
    localStorage.clear();
  }
  cancel() {
    this.logoutdisplay = false;
  }
  onPersonal() {
    this.router.navigate(['/reg-personal']);
  }

  onParent() {
    debugger;

    this.router.navigate(['/reg-parent']);
  }

  onDocument() {
    this.router.navigate(['reg-document'],  {queryParams: {'registerNo':this.registerNo}, skipLocationChange: false});
  }

  onSchool() {
    this.router.navigate(['/reg-school'])
  }


  initializeMap(){
    var center = [13.0827, 80.2707];
        var baseMaps = {
          'Map': this.mapview,
          'Terrain': this.terrainview,
          'Satellite': this.satelliteview,
        };
    
        this.map = L.map('mapId', { minZoom: 1, tilt: true }).setView(center, 15, { heading: 100.0, tilt: 10.0 }).on('click',e=> this.mapClick(e));
        this.markerImage = L.icon({
          iconUrl: 'assets/img/marker-icon.png',
          iconSize: [40, 50],
        });
      //   this.map.on('click', function(e) {
       
      //     this.markers = L.marker([13.0827, 80.2707],{draggable:'true',icon: this.markerImage}).on('dragend',e => this.onMarkerDrag(e)).addTo(this.map);
      //     // this.markers = L.marker([e.latlng.lat,e.latlng.lng]).addTo(this.map)
      // });
         this.markers = L.marker([13.0827, 80.2707],{draggable:'true',icon: this.markerImage}).on('dragend',e => this.onMarkerDrag(e)).addTo(this.map);
        // L.marker([13.0827, 80.2707]).addTo(this.map)
        // let marker = new L.Marker([13.0827, 80.2707]);
        // marker.addTo(this.map);
        L.control.layers(baseMaps).addTo(this.map);
        this.mapview.addTo(this.map);
       
        // Zoom control
        this.map.addControl(L.control.zoomBox({
          addToZoomControl: true,
        }));
    }
    mapClick(e)
    {
      debugger;
      this.latitude = e.latlng['lat'];
      this.longititude =e.latlng['lng'];
      if (this.markers) {
        this.map.removeLayer(this.markers);
      }
      this.map.panTo([this.latitude, this.longititude]);
      this.map.setView([this.latitude, this.longititude], 15);
       this.markers = L.marker([this.latitude, this.longititude], {draggable:'true',icon: this.markerImage }).on('dragend',e => this.onMarkerDrag(e)).addTo(this.map);
       this.submitted = false;
       this.addressDetailsForm.controls['map_address'].setValue("");
    //  this.getAddressFromLatLng();
       
    }
    onMarkerDrag(e) {
      debugger;
      this.latitude = e.target._latlng.lat;
      this.longititude =e.target._latlng.lng;
      var lat = this.latitude;
  var lng = this.longititude;
  this.submitted = false;
  this.addressDetailsForm.controls['map_address'].setValue("");
//   if(lat && lng)
//   {
// this.getAddressFromLatLng();
//   }
    }
    getLocation(value)
    {
      debugger;
var searchLocation = value;
debugger;
this.contentService.getLatLong(searchLocation).subscribe((res) => {
    debugger;
    if(res['results'].length > 0)
    {
      this.location = res['results'][0];
      this.latitude = this.location.geometry.location['lat'];
      this.longititude =this.location.geometry.location['lng'];
      this.addressDetailsForm.controls['map_address'].setValue(this.location.formatted_address);
      if (this.markers) {
        this.map.removeLayer(this.markers);
      }
      this.map.panTo([this.latitude, this.longititude]);
      this.map.setView([this.latitude, this.longititude], 15);
       this.markers = L.marker([this.latitude, this.longititude], {draggable:'true',icon: this.markerImage }).on('dragend',e => this.onMarkerDrag(e)).addTo(this.map);
}
else {
  this.isAddressNotFound = true;
}
});
    }
getAddressFromLatLng()
{
  debugger;
  var lat = this.latitude;
  var lng = this.longititude;
  if(lat && lng)
  {
    this.contentService.getAddress(lat,lng).subscribe(data => { 
      debugger;
      this.address = data['results'];
      if(this.address.length > 0)
      {
        var address = this.address[0].formatted_address;
        this.addressDetailsForm.controls['map_address'].setValue(address);
      }
    });
  }
  else {
    this.alertService.error("No Location is Selected");
    
  }
}
showConfirmPopup()
{
  this.submitted = true;
  if (this.addressDetailsForm.valid) {
  this.display = true;
}
else {
  this.validateControl();
}
}
changeAddress()
{
  this.display = false;
}
onSaveAddress() {
  debugger
  this.submitted = true;
  if (this.addressDetailsForm.valid) {
  var records = {
    "records":
    {
      "register_no": this.registerNo,
      "address": this.addressDetailsForm.value.address,
      "pincode": this.addressDetailsForm.value.pincode,
      "district_id": this.addressDetailsForm.value.district_id,
      "latitude": this.latitude,
      "longitude": this.longititude,
      "map_address": this.addressDetailsForm.value.map_address
    }
  }
    this.contentService.getAddressDetails(records).subscribe((res) => {
      debugger;
      if (res.dataStatus == true) {
        this.messageService.add({severity:'success', summary: 'Records Updated Successfully', detail:''});
        this.router.navigate(['reg-document'],  {queryParams: {'value':this.appvalue,'registerNo':this.registerNo}, skipLocationChange: false});
      }
      else {
        this.messageService.add({severity:'warn', summary: 'Failed', detail:''});
      }
    });
  }
  else {
   this.validateControl();
  }
 
}
validateControl() {
  for (const key of Object.keys(this.addressDetailsForm.controls)) {
    if (this.addressDetailsForm.controls[key].invalid) {
       const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
      console.log('invalid keys',key);
      invalidControl.focus();
       break;
    }
  }
  this.messageService.add({severity:'warn', summary: 'Please fill all the Required Fields', detail:''});
}
}
