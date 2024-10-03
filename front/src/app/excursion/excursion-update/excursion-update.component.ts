import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ExcursionService} from "../excursion.service";
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../category/category.service";
import {NgForOf, NgIf} from "@angular/common";
import {GlobalService} from "../../global.service";
import {NavigateDirective} from "../../navigate.directive";
import {AlertService} from "../../alert/alert.service";

@Component({
	selector: 'app-excursion-update',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		FormsModule,
		NgForOf,
		NgIf,
		NavigateDirective
	],
	templateUrl: './excursion-update.component.html',
})

export class ExcursionUpdateComponent implements OnInit {
	excursionFormGroup = new FormGroup({
		name: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		price: new FormControl("", [Validators.required, Validators.min(0.01), Validators.max(1000000)]),
		description: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		categoryId: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
	});

	file: any = null;
	categories: any[] = [];
	id: number = 0;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
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

		this.activatedRoute.queryParams.subscribe(value => {
			this.id = value['id'];
		})

		this.excursionService.findById(this.id).subscribe({
			next: ((res: any) => {
				this.excursionFormGroup.setValue({
					name: res.data.name,
					price: res.data.price,
					description: res.data.description,
					categoryId: res.data.categoryId,
				})
			}),
			error: ((e) => {
				console.log("error", e);
				this.router.navigate(
					['/error'],
					{
						queryParams: {
							message: e.error.code + ' : ' + e.error.message,
						}
					}
				);
			})
		});

		this.categoryService.categorySubject.subscribe(value => {
			this.categories = value.categories;
		})
		this.categoryService.getCategories();
	}

	updateExcursion() {
		this.excursionService.update(this.excursionFormGroup.value, this.id).subscribe({
			next: ((res: any) => {
				if (this.file !== null) {
					this.excursionService.updateImg(this.file, res.data.id).subscribe({
						next: (() => {
							this.router.navigate(
								['/excursion'],
								{queryParams: {id: res.data.id}}
							);
						}),
						error: ((e: any) => {
							console.log("error", e);
							this.alert.showAlertMessage(e.error.message);
						})
					})
				} else {
					this.router.navigate(
						['/excursion'],
						{queryParams: {id: res.data.id}}
					);
				}
			}),
			error: ((e) => {
				console.log("error", e);
				this.alert.showAlertMessage(e.error.message);
			})
		})
	}

	updateImg(event: any) {
		this.file = event.target.files[0];
	}
}
