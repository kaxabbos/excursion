import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ExcursionService} from "../excursion.service";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {CategoryService} from "../../category/category.service";
import {NgForOf, NgIf} from "@angular/common";
import {GlobalService} from "../../global.service";
import {NavigateDirective} from "../../navigate.directive";
import {AlertService} from "../../alert/alert.service";

@Component({
	selector: 'app-excursion-save',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		FormsModule,
		NgForOf,
		NgIf,
		NavigateDirective
	],
	templateUrl: './excursion-save.component.html',
})

export class ExcursionSaveComponent implements OnInit {
	excursionFormGroup = new FormGroup({
		name: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		price: new FormControl("", [Validators.required, Validators.min(0.01), Validators.max(1000000)]),
		description: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		categoryId: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
	});

	file: any = null;

	categories: any[] = [];

	constructor(
		public router: Router,
		private authService: AuthService,
		private excursionService: ExcursionService,
		private categoryService: CategoryService,
		private global: GlobalService,
		private alert: AlertService,
	) {
	}

	ngOnInit(): void {
		this.authService.getUserProfile().add(() => {
			if (this.global.role !== 'MANAGER') this.router.navigate(['/login']);
		})

		this.categoryService.categorySubject.subscribe(value => {
			this.categories = value.categories;
		})

		this.categoryService.getCategories();
	}

	add() {
		this.excursionService.save(this.excursionFormGroup.value).subscribe({
			next: ((res: any) => {
				this.excursionService.updateImg(this.file, res.data.id).subscribe({
					next: (() => {
						this.router.navigate(
							['/excursion'],
							{queryParams: {id: res.data.id}}
						);
					}),
					error: ((e: any) => {
						console.log("error", e.error);
						this.alert.showAlertMessage(e.error.message);
					})
				})
			}),
			error: ((e: any) => {
				console.log("error", e.error);
				this.alert.showAlertMessage(e.error.message);
			})
		})
	}

	updateImg(event: any) {
		this.file = event.target.files[0];
	}
}
