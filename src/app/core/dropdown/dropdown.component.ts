import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styles: [
  ]
})
export class DropdownComponent implements OnInit {
  @Input() formcontrolname;
  @Input() planetList;
  @Input('formname') falconeForm;
  @Input('vehicles') vehicles;
  @Input('planets') localPlanetArr;
  @Input('index') i;

  selectedPlanets;

  constructor(private _homeService: HomeService) { }

  ngOnInit(): void {
    this._homeService.falconeState.subscribe(res => {
      this.selectedPlanets = res['planet_names']
    });
  }

  private get destinations(): FormArray {
    return this.falconeForm.get('destinations') as FormArray;
  }

  selectPlanet(e, index) {
    this._homeService.push(index, 'planet', e.target.value);
    this.destinations.get([index + "", "vehiclesList"]).patchValue(this.vehicles);
    this.disablePlanet(index)
  }

  disablePlanet(index) {
    this.localPlanetArr.filter((p, i)=>{
      if(this.selectedPlanets.includes(p.name)) this.localPlanetArr[i].is_active = false;
      else this.localPlanetArr[i].is_active = true;
    });
    
    [0,1,2,3].forEach((p,i)=>{
      if(i != index) this.destinations.get([i + "", "planetList"]).patchValue(this.localPlanetArr)
    });
  }
}
