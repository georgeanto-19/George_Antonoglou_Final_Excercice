import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../uI-common/base-component';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormGroup } from '@angular/forms';
import { RepairModel } from 'src/app/models/repair.model';

@Component({
	standalone: false,
	selector: 'app-repair',
	templateUrl: './repair.component.html',
	styleUrls: ['./repair.component.scss']
})
export class RepairComponent extends BaseComponent implements OnInit {
	repairs: FormArray = null;

	constructor(private router: Router, private http: HttpClient) {
		super();
	}
	ngOnInit() {
		const authToken = localStorage.getItem("access_token");
		if (!authToken) {
			this.router.navigate(['/']);
		}
		this.loadRepairs();
	}

	loadRepairs() {
		this.http.get(`${this.API_URL}/api/repair`, {}).subscribe((repairs: any) => {
			const repairList = repairs.map((repair) =>
				new RepairModel().init(repair.repairId, repair.plateNumber, repair.startDate, repair.endDate, repair.statuses).getFromModel()
			)
			this.repairs = new FormArray(repairList);
		}, (err) => {
			if (err === 'Unauthorized' || err.status === 401) {
				localStorage.removeItem('access_token');
				this.router.navigateByUrl('/');
			}
		});
	}

	editRepair(repair: FormGroup) {
		repair.enable();
	}
	saveRepair(repair: FormGroup) {
		this.http.patch(`${this.API_URL}/api/repair`, repair.getRawValue()).subscribe((repairs: any) => {
			repair.disable();
			this.loadRepairs();
		}, (err) => {
			if (err === 'Unauthorized' || err.status === 401) {
				localStorage.removeItem('access_token');
				this.router.navigateByUrl('/');
			}
		});
	}

	addRepair() {
		this.repairs.controls.push(new RepairModel().getFromModel());
	}

	deleteRepair(repair: FormGroup) {
		this.http.delete(`${this.API_URL}/api/repair/${repair.get('repairTaxId').value}`, {}).subscribe((repairs: any) => {
			this.loadRepairs();
		}, (err) => {
			if (err === 'Unauthorized' || err.status === 401) {
				localStorage.removeItem('access_token');
				this.router.navigateByUrl('/');
			}
		});
	}

}
