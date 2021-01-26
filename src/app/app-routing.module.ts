import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { AddComponent } from './_components/add/add.component';
import { PaymentComponent } from './_components/payment/payment.component';
import { AuthGuard } from './_guard/auth.guard'
import { SettingsComponent } from './_components/settings/settings.component'
import { OrderComponent } from './_components/order/order.component'


const routes: Routes = [
  { 
    path: '', redirectTo: '/login', pathMatch: 'full' 
  },
  {
    path: 'login', component: LoginComponent
  }
  ,{
    path: 'register', component: RegisterComponent
  }
  ,{
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard] ,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'add',
        component: AddComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent,
      },
      {
        path: 'order',
        component: OrderComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
