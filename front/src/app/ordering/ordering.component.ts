import {Component, OnInit} from '@angular/core';
import {OrderingService} from "./ordering.service";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {OrderingCardComponent} from "./ordering-card/ordering-card.component";
import {GlobalService} from "../global.service";
import {EnumService} from "../enum.service";

@Component({
	selector: 'app-ordering',
	standalone: true,
	imports: [
		NgIf,
		FormsModule,
		OrderingCardComponent,
		KeyValuePipe,
		NgForOf
	],
	templateUrl: './ordering.component.html',
})

export class OrderingComponent implements OnInit {

	orderings: any[] = []

	orderingStatuses: any[] = [];
	filterDate: any = '';
	filterStatus: any = '0';

	constructor(
		private orderingService: OrderingService,
		private authService: AuthService,
		private router: Router,
		private global: GlobalService,
		private enumService: EnumService,
	) {
	}

	get sorted() {
		let res = this.orderings;

		res = res.filter(value => value.date.includes(this.filterDate));

		if (this.filterStatus !== '0') {
			res = res.filter(value => value.status === this.filterStatus);
		}

		res = res.sort((a, b) => (a.status < b.status ? 1 : -1));

		return res;
	}

	ngOnInit(): void {
		this.authService.getUserProfile().add(() => {
			if (this.role !== 'USER' && this.role !== 'MANAGER') this.router.navigate(['/login']);
		})

		this.orderingService.orderingSubject.subscribe(value => {
			this.orderings = value.orderings;
		})
		this.orderingService.findAll();

		this.enumService.enumSubject.subscribe(value => {
			this.orderingStatuses = value.orderingStatuses;
			console.log(this.orderingStatuses);
		})
		this.enumService.getOrderingStatuses();

	}

	get role() {
		return this.global.role;
	}


}
