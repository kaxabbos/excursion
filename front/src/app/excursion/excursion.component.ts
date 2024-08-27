import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ExcursionService} from "./excursion.service";
import {AuthService} from "../auth/auth.service";
import {ExcursionCardComponent} from "./excursion-card/excursion-card.component";
import {NgIf} from "@angular/common";
import {CategoryService} from "../category/category.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GlobalService} from "../global.service";

@Component({
	selector: 'app-excursion',
	standalone: true,
	imports: [
		ExcursionCardComponent,
		NgIf,
		ReactiveFormsModule,
		FormsModule
	],
	templateUrl: './excursion.component.html',
})
export class ExcursionComponent implements OnInit {
	excursions: any[] = []
	categories: any[] = []
	name = '';
	categoryId = 0;
	filter = 0;

	constructor(
		public router: Router,
		private excursionService: ExcursionService,
		private authService: AuthService,
		private categoryService: CategoryService,
		private global: GlobalService,
	) {
	}

	excursionsSorted() {
		let res = this.excursions;

		res = res.filter(value => value.name.includes(this.name));

		if (this.categoryId != 0) {
			res = res.filter(value => value.categoryId == this.categoryId);
		}

		if (this.filter == 0) res = res.sort((a, b) => (a.id < b.id ? 1 : -1));
		else if (this.filter == 1) res = res.sort((a, b) => (a.id > b.id ? 1 : -1));
		else if (this.filter == 2) res = res.sort((a, b) => (a.price > b.price ? 1 : -1));
		else if (this.filter == 3) res = res.sort((a, b) => (a.price < b.price ? 1 : -1));
		else if (this.filter == 4) res = res.sort((a, b) => (a.name > b.name ? 1 : -1));
		else if (this.filter == 5) res = res.sort((a, b) => (a.name < b.name ? 1 : -1));

		return res;
	}

	ngOnInit(): void {
		this.authService.getUserProfile();

		this.excursionService.excursionSubject.subscribe(value => {
			this.excursions = value.excursions;
		})

		this.categoryService.categorySubject.subscribe(value => {
			this.categories = value.categories;
		})

		this.excursionService.findAll();
		this.categoryService.getCategories();
	}

	getRole() {
		return this.global.role;
	}

}
