import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleModel } from '../../models/vehicle.model';
import { BaseComponent } from '../../uI-common/base-component';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
	standalone: false,
	selector: 'app-vehicle',
	templateUrl: './vehicle.component.html',
	styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent extends BaseComponent implements OnInit {
	vehicles: FormArray = null;


	constructor(private router: Router, private http: HttpClient) {
		super();
	}

	ngOnInit() {
		const authToken = localStorage.getItem("access_token");
		if (!authToken) {
			this.router.navigate(['/']);
		}
		this.loadVehicles();
	}

	loadVehicles() {
		this.http.get(`${this.API_URL}/api/vehicle`, {}).subscribe((vehicles: any) => {
			const vehicleList = vehicles.map((vehicle) =>
				new VehicleModel().init(vehicle.plateNumber, vehicle.insuranceDate, vehicle.ownerTaxId, vehicle.brand, vehicle.model, vehicle.color).getFromModel()
			)
			this.vehicles = new FormArray(vehicleList);
		}, (err) => {
			if (err === 'Unauthorized' || err.status === 401) {
				localStorage.removeItem('access_token');
				this.router.navigateByUrl('/');
			}
		});
	}

	editVehicle(vehicle: FormGroup) {
		vehicle.enable();
	}
	saveVehicle(vehicle: FormGroup) {
		this.http.patch(`${this.API_URL}/api/vehicle`, vehicle.getRawValue()).subscribe((vehicles: any) => {
			vehicle.disable();
			this.loadVehicles();
		}, (err) => {
			if (err === 'Unauthorized' || err.status === 401) {
				localStorage.removeItem('access_token');
				this.router.navigateByUrl('/');
			}
		});
	}

	addVehicle() {
		this.vehicles.controls.push(new VehicleModel().getFromModel());
	}

	deleteVehicle(vehicle: FormGroup) {
		this.http.delete(`${this.API_URL}/api/vehicle/${vehicle.get('vehicleTaxId').value}`, {}).subscribe((vehicles: any) => {
			this.loadVehicles();
		}, (err) => {
			if (err === 'Unauthorized' || err.status === 401) {
				localStorage.removeItem('access_token');
				this.router.navigateByUrl('/');
			}
		});
	}

}
