import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InsuranceModel } from '../../models/insurance.model';
import { BaseComponent } from '../../uI-common/base-component';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
	standalone: false,
	selector: 'app-insurance',
	templateUrl: './insurance.component.html',
	styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent extends BaseComponent implements OnInit {
	insurances: FormArray = null;


	constructor(private router: Router, private http: HttpClient) {
		super();
	}

	ngOnInit() {
		const authToken = localStorage.getItem("access_token");
		if (!authToken) {
			this.router.navigate(['/']);
		}
		this.loadInsurance();
	}

	loadInsurance() {
		this.http.get(`${this.API_URL}/api/insurance`, {}).subscribe((insurance: any) => {
			const insuranceList = insurance.map((insurance) =>
				new InsuranceModel().init(insurance.insuranceId, insurance.ownerTaxId, insurance.plateNumber, insurance.expiryDate, insurance.price).getFromModel()
			)
			this.insurances = new FormArray(insuranceList);
		}, (err) => {
			if (err === 'Unauthorized' || err.status === 401) {
				localStorage.removeItem('access_token');
				this.router.navigateByUrl('/');
			}
		});
	}

	editInsurance(insurance: FormGroup) {
		insurance.enable();
	}
	saveInsurance(insurance: FormGroup) {
		this.http.patch(`${this.API_URL}/api/insurance`, insurance.getRawValue()).subscribe((insurances: any) => {
			insurance.disable();
			this.loadInsurance();
		}, (err) => {
			if (err === 'Unauthorized' || err.status === 401) {
				localStorage.removeItem('access_token');
				this.router.navigateByUrl('/');
			}
		});
	}

	addInsurance() {
		this.insurances.controls.push(new InsuranceModel().getFromModel());
	}

	deleteInsurance(insurance: FormGroup) {
		this.http.delete(`${this.API_URL}/api/insurance/${insurance.get('insuranceTaxId').value}`, {}).subscribe((insurance: any) => {
			this.loadInsurance();
		}, (err) => {
			if (err === 'Unauthorized' || err.status === 401) {
				localStorage.removeItem('access_token');
				this.router.navigateByUrl('/');
			}
		});
	}

}
