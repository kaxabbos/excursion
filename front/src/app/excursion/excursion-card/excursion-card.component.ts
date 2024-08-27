import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
	selector: 'app-excursion-card',
	standalone: true,
	imports: [],
	templateUrl: './excursion-card.component.html',
})

export class ExcursionCardComponent {
	@Input() excursion: any;

	constructor(
		private router: Router,
	) {
	}

	excursionPage() {
		this.router.navigate(
			['/excursion'],
			{queryParams: {excursionId: this.excursion.id}}
		);
	}
}
