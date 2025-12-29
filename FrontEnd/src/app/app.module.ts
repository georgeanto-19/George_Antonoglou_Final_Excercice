
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UiCommonModule } from './uI-common/ui-common.module';
import { HomeComponent } from './home/home.component';
import { OwnerComponent } from './lists/owner/owner.component';
import { VehicleComponent } from './lists/vehicle/vehicle.component';
import { InsuranceComponent } from './lists/insurance/insurance.component';
import { FullComponent } from './lists/full/full.component';
import { RepairComponent } from './lists/repair/repair.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OwnerComponent,
    VehicleComponent,
    InsuranceComponent,
    FullComponent,
    RepairComponent,
  ],
  imports: [
    UiCommonModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'owner-page', component: OwnerComponent },
      { path: 'vehicle-page', component: VehicleComponent },
      { path: 'insurance-page', component: InsuranceComponent },
      { path: 'full-page', component: FullComponent },
      { path: 'repair-page', component: RepairComponent },
    ])
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

