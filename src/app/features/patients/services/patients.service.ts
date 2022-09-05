import { HttpClient } from '@angular/common/http';
import { Injectable, Query } from '@angular/core';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Patient } from '../../../shared/models/patient.model';
import { PATIENTS_LIST_URL } from '../constants/patients-url.contant';

@Injectable({
    providedIn: 'root',
})
export class PatientsService {
    constructor(
        private readonly httpClient: HttpClient,
    ) { }


    getPatients(): Observable<Patient[]> {
        return this.httpClient.get(PATIENTS_LIST_URL).pipe(
            map((response: any) => response?.patient));
    }
}
