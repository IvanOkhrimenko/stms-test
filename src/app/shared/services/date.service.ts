import { HttpClient } from '@angular/common/http';
import { Injectable, Query } from '@angular/core';
import { differenceInYears, parse } from 'date-fns';

@Injectable({
    providedIn: 'root',
})
export class DateService {
    constructor(
        private readonly httpClient: HttpClient,
    ) { }

    getAgeFromDate(value: string): string {
        if (!value) {
            return 'Unknown';
        }

        return this.getDifferenceInYear(value).toString();
    }

    private getDifferenceInYear(value: string): number {
        const date = parse(value, "dd-MM-yyyy", new Date());
        console.log(date);

        return differenceInYears(new Date(), date)
    }
}
