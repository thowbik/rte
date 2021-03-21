import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContentService } from '../content.service';
declare var L: any;declare var L: any;
import { icon, latLng, marker, polyline, tileLayer,Marker } from 'leaflet';
import { AlertService } from 'src/services/alert.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
  constructor(private registerService : ContentService,
    private http: HttpClient,
    private alertService: AlertService) { }

  ngOnInit() {
    debugger;
    // this.initializeMap();
    // renderKML()
    //  moveMapToBerlin(this.map.nativeElement.innerHTML)
    
    
  }
  initializeMap(){
    var center = [13.0827, 80.2707];
        var baseMaps = {
          'Map': this.mapview,
          'Terrain': this.terrainview,
          'Satellite': this.satelliteview,
        };
    
        this.map = L.map('mapId', { minZoom: 1, tilt: true }).setView(center, 15, { heading: 100.0, tilt: 10.0 });
        this.markerImage = L.icon({
          iconUrl: 'assets/img/marker-icon.png',
          iconSize: [40, 50],
        });
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
    onMarkerDrag(e) {
      debugger;
      this.latitude = e.target._latlng.lat;
      this.longititude =e.target._latlng.lng;
      alert("Lat, Lon : " + this.latitude + ", " + this.longititude);
      var lat = this.latitude;
  var lng = this.longititude;
  alert(this.latitude);
  alert(this.longititude);
    }
    getLocation(event)
    {
var searchLocation = event.target.value;
debugger;
this.registerService.getLatLong(searchLocation).subscribe(data => {
    debugger;
    if(data)
    {
      this.location = data;
      this.latitude = this.location.items[0].position['lat'];
      this.longititude =this.location.items[0].position['lng'];
      if (this.markers) {
        this.map.removeLayer(this.markers);
      }
      this.map.panTo([this.latitude, this.longititude]);
      this.map.setView([this.latitude, this.longititude], 15);
       this.markers = L.marker([this.latitude, this.longititude], {draggable:'true',icon: this.markerImage }).on('dragend',e => this.onMarkerDrag(e)).addTo(this.map);
}
});
    }
getAddressFromLatLng()
{
  debugger;
  var lat = this.latitude;
  var lng = this.longititude;
  alert(this.latitude);
  alert(this.longititude);
  if(lat && lng)
  {
    this.registerService.getAddress(lat,lng).subscribe(data => { 
      debugger;
      this.address = data['Response'].View[0].Result[0].Location.Address.Label;
    });
  }
  else {
    this.alertService.error("No Location is Selected");
    
  }
 
}
}
