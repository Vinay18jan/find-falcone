import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, pairwise } from 'rxjs/operators';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-falcone-home',
  templateUrl: './falcone-home.component.html',
  styleUrls: ['./falcone-home.component.scss']
})
export class FalconeHomeComponent implements OnInit {
  planets
  vehicles;
  falconeForm: FormGroup;
  localPlanetArr
  selectedPlanets
  prevSelected
  currentlySelectedPlanet=[]
  currentlySelectedVechile=[]
  timeTaken = []
  sumTimeTaken = 0
  finalReq;
  private subs = new Subscription();
  
  constructor(private _homeService: HomeService, private formBuilder: FormBuilder, private _router: Router,
    private cd: ChangeDetectorRef) { 
    this.createForm();
  }

  ngOnInit(): void {
    this.getToken();
    this.getPlanets();
    this.getVehicles();
    setTimeout(() => {
      this.setForm();
    }, 1000);
  }

  getToken() {
    this.subs.add(this._homeService.getToken()
      .subscribe(res => this._homeService.push(null, 'token', res['token'])));
  }

  getPlanets() {
    this.subs.add(this._homeService.getPlanets().subscribe(
      result => {
        this.planets = //Array(4).fill
          (result);
        this.planets.forEach((v,i) => {
          this.planets[i].is_active = true;
        })
        this.localPlanetArr = JSON.parse(JSON.stringify(this.planets));
      }
    ))
  }

  getVehicles() {
    this.subs.add(this._homeService.getVehicles().subscribe(
      result => {
        this.vehicles = //Array(4).fill
          (result); 
      }
    ))
  }

  createForm() {
    this.falconeForm = this.formBuilder.group({
      destinations: this.formBuilder.array([
        this.formBuilder.group({
          planets: '',
          vehicles: '',
          vehiclesList: [],
          planetList: []
        }),
        this.formBuilder.group({
          planets: '',
          vehicles: '',
          vehiclesList: [],
          planetList: []
        }),
        this.formBuilder.group({
          planets: '',
          vehicles: '',
          vehiclesList: [],
          planetList: []
        }),
        this.formBuilder.group({
          planets: '',
          vehicles: '',
          vehiclesList: [],
          planetList: []
        })
      ])
    });
    this.subs.add(this.destinations.controls.forEach(
      control => {
        control.valueChanges.pipe(
          distinctUntilChanged(),
          pairwise()
        ).subscribe(
          ([oldValue,newValue]) => { // logs index of changed item in form array
            let latestDestModified = this.destinations.controls.indexOf(control)
            if(oldValue.planets != newValue.planets) {
              let patchValueForSelectedPlanet = newValue.planetList.filter((p, i) => {if(p.name===newValue.planets) return p});
              this.currentlySelectedPlanet[latestDestModified] = patchValueForSelectedPlanet;
            }
            let patchValueForSelectedVechicle = this.vehicles.filter((p, i) => {if(p.name===newValue.vehicles) return p});
            this.currentlySelectedVechile[latestDestModified] = patchValueForSelectedVechicle;
            this.prevSelected = this.falconeForm.value["destinations"][latestDestModified];
          }
        )
      }
    ))
    this.subs.add(this._homeService.falconeState.subscribe(res => {
      this.selectedPlanets = res['planet_names']
      this.finalReq = res
    }));
  }

  setForm() {
    [0,1,2,3].forEach((v, i)=> {
      this.destinations.get([i + "", "planetList"]).patchValue(this.planets);
    })    
  }

  get destinations(): FormArray {
    return this.falconeForm.get('destinations') as FormArray;
  }

  selectPlanet(e, index) {
    this._homeService.push(index, 'planet', e.target.value);
    this.destinations.get([index + "", "vehiclesList"]).patchValue(this.vehicles);
    
    this.disablePlanet(index)
  }

  disablePlanet(index) {
    this.localPlanetArr.filter((p, i)=>{
      if(this.selectedPlanets.includes(p.name)) {
        this.localPlanetArr[i].is_active = false;
      }
      else this.localPlanetArr[i].is_active = true;
    });
    
    [0,1,2,3].forEach((p,i)=>{
      if(i != index) this.destinations.get([i + "", "planetList"]).patchValue(this.localPlanetArr)
    });
  }

  selectVehicle(e, index) {
    this._homeService.push(index, 'vehicle', this.falconeForm.value.destinations[index].vehicles);

    this.vehicles.forEach((v, i)=>{
      if(v.name == this.falconeForm.value.destinations[index].vehicles) {
        v.total_no--;
        this.cd.detectChanges();
        let timeTaken = Math.floor((this.currentlySelectedPlanet[index][0].distance / this.currentlySelectedVechile[index][0].max_distance)*100)
        this.timeTaken[index] = timeTaken
        this.sumTimeTaken = this.timeTaken.reduce((pv, cv) => pv + cv, 0);
      }
      else if(v.name == this.prevSelected.vehicles) v.total_no++;
    });

  }

  getCurrentPlant(index) {
    return this.currentlySelectedPlanet[index][0]?.distance
  }

  submit() {
    this.subs.add(this._homeService.findFalcone(this.finalReq)
    .subscribe(res => {
      if(res['status']== 'success') {
        let url = this._router.serializeUrl(
          this._router.createUrlTree(['success',{'success': true, 'planet': res['planet_name'], 'timeTaken': this.sumTimeTaken }]));
        window.open(url, '_blank');
      }
      else if(res['status']=='false') {
        let url = this._router.serializeUrl(this._router.createUrlTree(['success',{'success': false, 'planet': '', 'timeTaken': this.sumTimeTaken}]));
        window.open(url, '_blank');
      }
    }))
  }

  isFormValid() {
    return this.finalReq.planet_names.length == 4 && this.finalReq.vehicle_names.length == 4
  }

  reset() {
    this.destinations.controls.forEach(control => {
      control['controls']['vehiclesList'].reset();
    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
