import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SeatPlanComponent } from './components/seat-plan/seat-plan.component';


export const routes: Routes = [
    { path:'app-login', component:LoginComponent },
    { path:'app-register', component:RegisterComponent },
    { path: 'app-seat-plan', component:SeatPlanComponent}
    
];
