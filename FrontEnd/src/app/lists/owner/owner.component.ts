import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerModel } from '../../models/owner.model';
import { BaseComponent } from '../../uI-common/base-component';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
	standalone: false,
	selector: 'app-owner',
	templateUrl: './owner.component.html',
	styleUrls: ['./owner.component.scss']
})
export class OwnerComponent extends BaseComponent implements OnInit {
	owners: FormArray = null;


	constructor(private router: Router, private http: HttpClient) {
		super();
	}

	ngOnInit() {
		const authToken = localStorage.getItem("access_token");
		if (!authToken) {
			this.router.navigate(['/']);
		}
		this.loadOwners();
	}

	loadOwners() {
		this.http.get(`${this.API_URL}/api/owner`, {}).subscribe((owners: any) => {
			const ownerList = owners.map((owner) =>
				new OwnerModel().init(owner.ownerTaxId, owner.name, owner.surname, owner.email, owner.age, owner.gender).getFromModel()
			)
			this.owners = new FormArray(ownerList);
		}, (err) => {
			if (err === 'Unauthorized' || err.status === 401) {
				localStorage.removeItem('access_token');
				this.router.navigateByUrl('/');
			}
		});
	}

	editOwner(owner: FormGroup) {
		owner.enable();
	}
	saveOwner(owner: FormGroup) {
		this.http.patch(`${this.API_URL}/api/owner`, owner.getRawValue()).subscribe((owners: any) => {
			owner.disable();
			this.loadOwners();
		}, (err) => {
			if (err === 'Unauthorized' || err.status === 401) {
				localStorage.removeItem('access_token');
				this.router.navigateByUrl('/');
			}
		});
	}

	addOwner() {
		this.owners.controls.push(new OwnerModel().getFromModel());
	}

	deleteOwner(owner: FormGroup) {
		this.http.delete(`${this.API_URL}/api/owner/${owner.get('ownerTaxId').value}`, {}).subscribe((owners: any) => {
			this.loadOwners();
		}, (err) => {
			if (err === 'Unauthorized' || err.status === 401) {
				localStorage.removeItem('access_token');
				this.router.navigateByUrl('/');
			}
		});
	}

}
