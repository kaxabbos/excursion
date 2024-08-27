import {Component, Input} from '@angular/core';
import {DecimalPipe, NgIf} from "@angular/common";
import {OrderingService} from "../ordering.service";
import {GlobalService} from "../../global.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-ordering-card',
	standalone: true,
	imports: [
		DecimalPipe,
		NgIf
	],
	templateUrl: './ordering-card.component.html',
})

export class OrderingCardComponent {
	@Input() ordering: any;

	constructor(
		private orderingService: OrderingService,
		private global: GlobalService,
		private router: Router,
	) {
	}

	getRole() {
		return this.global.role;
	}

	done() {
		this.orderingService.done(this.ordering.id);
	}

	reject() {
		this.orderingService.reject(this.ordering.id);
	}

	excursionPage(excursionId: number) {
		this.router.navigate(['/excursion'], {queryParams: {excursionId: excursionId}});
	}
}
