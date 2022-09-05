import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "../../shared/shared.module";
import { PatientsComponent } from "./patients/patients.component";
import { PatientsRoutingModule } from "./patients-routing.module";
import { PatientsEffects } from "./store/patients.effects";
import { PatientsReducer } from "./store/patients.reducer";
import { PATIENT_FEATURE_NAME } from "./store/patients.selectors";

@NgModule({
  declarations: [PatientsComponent],
  imports: [
    CommonModule,
    SharedModule,
    PatientsRoutingModule,
    StoreModule.forFeature(PATIENT_FEATURE_NAME, PatientsReducer),
    EffectsModule.forFeature([
      PatientsEffects
    ]),
  ],
  providers: []
})
export class PatientsModule { }
