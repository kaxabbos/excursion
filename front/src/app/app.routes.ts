import {Routes} from '@angular/router';
import {MainComponent} from "./main/main.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegComponent} from "./auth/reg/reg.component";
import {UserComponent} from "./user/user.component";
import {ErrorComponent} from "./error/error.component";
import {CategoryComponent} from "./category/category.component";
import {ExcursionComponent} from "./excursion/excursion.component";
import {ExcursionPageComponent} from "./excursion/excursion-page/excursion-page.component";
import {ExcursionSaveComponent} from "./excursion/excursion-save/excursion-save.component";
import {ExcursionUpdateComponent} from "./excursion/excursion-update/excursion-update.component";
import {OrderingComponent} from "./ordering/ordering.component";
import {StatsComponent} from "./stats/stats.component";

export const routes: Routes = [
	{path: "", component: MainComponent},

	{path: "reg", component: RegComponent},
	{path: "login", component: LoginComponent},

	{path: "users", component: UserComponent},

	{path: "categories", component: CategoryComponent},

	{path: "excursions", component: ExcursionComponent},
	{path: "excursion", component: ExcursionPageComponent},
	{path: "excursionAdd", component: ExcursionSaveComponent},
	{path: "excursionUpdate", component: ExcursionUpdateComponent},

	{path: "orderings", component: OrderingComponent},

	{path: "stats", component: StatsComponent},

	{path: "error", component: ErrorComponent},
	{path: "**", component: ErrorComponent},
];
