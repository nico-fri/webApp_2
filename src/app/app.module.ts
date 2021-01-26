import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/de";
registerLocaleData(localeDe);
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "../environments/environment";

import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { NavbarComponent } from "./_components/navbar/navbar.component";
import { SidebarComponent } from "./_components/sidebar/sidebar.component";
import { DashboardComponent } from "./_components/dashboard/dashboard.component";
import { AddComponent } from "./_components/add/add.component";
import { PaymentComponent } from "./_components/payment/payment.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { MaterialModule } from "./_material/material.module";
import { ChartsModule } from "ng2-charts";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { addDialog } from "src/app/_components/add/addDialog.component";
import { registerDialog } from "src/app/_components/dashboard/registerDialog.component";
import { FooterComponent } from "./_components/footer/footer.component";
import { SettingsComponent } from "./_components/settings/settings.component";
import { OrderComponent } from "./_components/order/order.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { LayoutModule } from "@angular/cdk/layout";
import { ApiService } from "./shared/api.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    AddComponent,
    PaymentComponent,
    HomeComponent,
    RegisterComponent,
    addDialog,
    registerDialog,
    FooterComponent,
    SettingsComponent,
    OrderComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ChartsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
  ],
  entryComponents: [addDialog, registerDialog],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "de-DE",
    },
    ApiService,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
