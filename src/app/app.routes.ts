import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SeatPlanComponent } from './components/seat-plan/seat-plan.component';
import { PlayComponent } from './components/play/play.component';
import { ShowComponent } from './components/show/show.component';
import { PlayListComponent } from './components/play-list/play-list.component';
import { PlayEditComponent } from './components/play-edit/play-edit.component';
import { ShowListComponent } from './components/show-list/show-list.component';
import {UserListComponent} from './components/user-list/user-list.component';


export const routes: Routes = [
    { path: '', redirectTo: 'app-play-list', pathMatch: 'full' },
    { path:'app-login', component:LoginComponent },
    { path:'app-register', component:RegisterComponent },
    { path: 'app-seat-plan', component:SeatPlanComponent},
    { path: 'app-play', component:PlayComponent},
    { path: 'app-show/:code', component:ShowComponent},
    { path: 'app-play-list', component:PlayListComponent},
    { path: 'play/edit/:code', component: PlayEditComponent},
    { path: 'show/find/:code', component: ShowListComponent},
    { path: 'show/edit/:id', component: SeatPlanComponent},
    { path: 'app-user-list', component: UserListComponent}
];
