import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalService} from "../../global.service";

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		FormsModule,
		NgIf
	],
	templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {

	message = "";

	loginForm = new FormGroup({
		username: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		password: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
	})

	constructor(
		private authService: AuthService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private global: GlobalService,
	) {
	}

	ngOnInit(): void {
	}

	loginFormSubmit() {
		this.authService.login(this.loginForm.value);
	}

}
