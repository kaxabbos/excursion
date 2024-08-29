import {Component, Input} from '@angular/core';
import {NavigateDirective} from "../../navigate.directive";

@Component({
	selector: 'app-excursion-card',
	standalone: true,
	imports: [
		NavigateDirective
	],
	templateUrl: './excursion-card.component.html',
})

export class ExcursionCardComponent {
	@Input() excursion: any;
}
