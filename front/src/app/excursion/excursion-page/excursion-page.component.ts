import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ExcursionService} from "../excursion.service";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {GlobalService} from "../../global.service";
import {OrderingService} from "../../ordering/ordering.service";
import {NavigateDirective} from "../../navigate.directive";
import {AlertService} from "../../alert/alert.service";

@Component({
	selector: 'app-excursion-page',
	standalone: true,
	imports: [
		NgIf,
		FormsModule,
		NavigateDirective
	],
	templateUrl: './excursion-page.component.html',
})
export class ExcursionPageComponent implements OnInit {
	id: any;
	excursion: any;
	date: string = '';

	constructor(
		public router: Router,
		private authService: AuthService,
		private activatedRoute: ActivatedRoute,
		private excursionService: ExcursionService,
		private orderingService: OrderingService,
		private global: GlobalService,
		private alert: AlertService,
	) {
	}

	ngOnInit(): void {
		this.authService.getUserProfile().add(() => {
			if (this.role === 'NOT') this.router.navigate(['/login']);
		})

		this.activatedRoute.queryParams.subscribe(params => {
			this.id = params['id'];
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

	get role() {
		return this.global.role;
	}

	deleteExcursion() {
		this.excursionService.delete(this.id).subscribe({
			next: (() => {
				this.router.navigate(['/excursions']);
			}),
			error: ((e) => {
				console.log("error", e);
				this.alert.showAlertMessage(e.error.message);
			})
		})
	}

	ordering() {
		this.orderingService.save(this.date, this.id).subscribe({
			next: (() => {
				this.alert.showAlertMessage('Заявка успешно оформлена');
			}),
			error: ((e: any) => {
				console.log("error", e);
				this.alert.showAlertMessage(e.error.message);
			})
		})
	}

	getUserid() {
		return this.global.userid;
	}
}
