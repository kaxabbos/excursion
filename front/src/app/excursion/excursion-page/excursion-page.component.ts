import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ExcursionService} from "../excursion.service";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {GlobalService} from "../../global.service";
import {OrderingService} from "../../ordering/ordering.service";

@Component({
	selector: 'app-excursion-page',
	standalone: true,
	imports: [
		NgIf,
		FormsModule
	],
	templateUrl: './excursion-page.component.html',
})
export class ExcursionPageComponent implements OnInit {
	id: any;
	excursion: any;
	message: any;
	date: string = '';

	constructor(
		public router: Router,
		private authService: AuthService,
		private activatedRoute: ActivatedRoute,
		private excursionService: ExcursionService,
		private orderingService: OrderingService,
		private global: GlobalService,
	) {
	}

	ngOnInit(): void {
		this.authService.getUserProfile().add(() => {
			if (this.getRole() === 'NOT') this.router.navigate(['/login']);
		})

		this.activatedRoute.queryParams.subscribe(params => {
			this.id = params['excursionId'];
		});

		this.excursionService.findById(this.id).subscribe({
			next: ((res: any) => {
				this.excursion = res.data;
			}),
			error: ((e) => {
				console.log("error", e);
				if (e.error.code === 404) {
					this.router.navigate(
						['/error'],
						{
							queryParams: {
								message: e.error.code + ' : ' + e.error.message,
							}
						}
					);
				} else {
					this.router.navigate(['/login']);
				}
			})
		});
	}

	getRole() {
		return this.global.role;
	}


	updatePage() {
		this.router.navigate(
			['/excursionUpdate'],
			{queryParams: {excursionId: this.id}}
		);
	}

	deleteExcursion() {
		this.excursionService.delete(this.id).subscribe({
			next: (() => {
				this.router.navigate(['/excursions']);
			}),
			error: ((e) => {
				console.log("error", e);
				this.message = e.error.message;
			})
		})
	}

	ordering() {
		this.orderingService.save(this.date, this.id).subscribe({
			next: ((res: any) => {
				this.message = 'Заявка успешно оформлена';
			}),
			error: ((e) => {
				console.log("error", e);
				this.message = e.error.message;
			})
		})
	}

	getUserid() {
		return this.global.userid;
	}
}
