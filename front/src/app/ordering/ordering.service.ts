import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {GlobalService} from "../global.service";

@Injectable({
	providedIn: 'root'
})
export class OrderingService {

	orderingSubject = new BehaviorSubject<any>({
		orderings: [],
		details: []
	})


	constructor(
		private http: HttpClient,
		private global: GlobalService
	) {
	}

	findAll() {
		this.http.get(
			this.global.backendURL + '/orderings',
			{headers: this.global.headersToken}
		).subscribe({
			next: ((res: any) => {
				this.orderingSubject.next({
					...this.orderingSubject.value,
					orderings: res.data,
				})
			}),
			error: ((e) => {
				console.log("error", e);
			})
		});
	}

	save(date: string, excursionId: number) {
		return this.http.post(
			this.global.backendURL + '/orderings',
			"",
			{
				headers: this.global.headersToken,
				params: new HttpParams().appendAll({
					date: date,
					excursionId: excursionId,
				})
			}
		);
	}

	done(id: number) {
		this.http.get(
			this.global.backendURL + `/orderings/${id}/done`,
			{headers: this.global.headersToken,}
		).subscribe({
			next: ((res: any) => {
				let orderings = this.orderingSubject.value.orderings.map((i: any) => i.id == id ? res.data : i);
				this.orderingSubject.next({
					...this.orderingSubject.value,
					orderings: orderings
				})
			}),
			error: ((e) => {
				console.log("error", e);
			})
		});
	}

	reject(id: number) {
		this.http.get(
			this.global.backendURL + `/orderings/${id}/reject`,
			{headers: this.global.headersToken,}
		).subscribe({
			next: ((res: any) => {
				let orderings = this.orderingSubject.value.orderings.map((i: any) => i.id == id ? res.data : i);
				this.orderingSubject.next({
					...this.orderingSubject,
					orderings: orderings
				})
			}),
			error: ((e) => {
				console.log("error", e);
			})
		});
	}


}
