import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {GlobalService} from "./global.service";

@Injectable({
	providedIn: 'root'
})

export class EnumService {

	enumSubject = new BehaviorSubject<any>({
		roles: null,
		orderingStatuses: null,
	})

	constructor(
		private http: HttpClient,
		private global: GlobalService
	) {
	}

	getRoles() {
		this.http.get(
			this.global.backendURL + '/enums/roles',
		).subscribe({
			next: ((res: any) => {
				this.enumSubject.next();
			}),
			error: ((error: any) => {
				console.log("error", error);
			})
		})
	}

	getOrderingStatuses() {
		this.http.get(
			this.global.backendURL + '/enums/orderingStatuses',
		).subscribe({
			next: ((res: any) => {
				this.enumSubject.next();
			}),
			error: ((error: any) => {
				console.log("error", error);
			})
		})
	}
}
