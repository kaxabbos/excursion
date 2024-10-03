import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {GlobalService} from "../global.service";

@Injectable({
	providedIn: 'root'
})

export class ExcursionService {

	excursionSubject = new BehaviorSubject<any>({
		excursions: [],
	})

	constructor(
		private http: HttpClient,
		private global: GlobalService
	) {
	}

	findAll() {
		this.http.get(
			this.global.backendURL + '/excursions',
		).subscribe({
			next: ((res: any) => {
				this.excursionSubject.next()
			}),
			error: (e: any) => {
				console.log("error", e);
			}
		});
	}

	findById(id: number) {
		return this.http.get(
			this.global.backendURL + `/excursions/${id}`,
			{headers: this.global.headersToken}
		);
	}

	save(excursion: any) {
		let body = JSON.stringify(excursion);
		return this.http.post(
			this.global.backendURL + '/excursions',
			body,
			{
				headers: this.global.headersJsonToken,
				params: new HttpParams().appendAll({
					categoryId: excursion.categoryId,
				})
			}
		);
	}

	update(excursion: any, id: any) {
		let body = JSON.stringify(excursion);
		return this.http.put(
			this.global.backendURL + `/excursions/${id}`,
			body,
			{
				headers: this.global.headersJsonToken,
				params: new HttpParams().appendAll({
					categoryId: excursion.categoryId,
				})
			}
		);
	}

	updateImg(file: File, id: any) {
		let formData = new FormData();
		formData.append('file', file, file.name);
		return this.http.patch(
			this.global.backendURL + `/excursions/${id}/img`,
			formData,
			{
				headers: this.global.headersMultipartToken,
			}
		);
	}

	delete(id: any) {
		return this.http.delete(
			this.global.backendURL + `/excursions/${id}`,
			{headers: this.global.headersToken}
		);
	}
}
