import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarService } from './nav-bar.service';

// Import pages
import { AppComponent } from './app.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { MyOffersComponent } from './my-offers/my-offers.component';
import { BrowseOffersComponent } from './browse-offers/browse-offers.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { BookOfferComponent } from './book-offer/book-offer.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuardService } from './auth-guard.service';
import { TestComponent } from './test/test.component';

const routes: Routes = [/* Add route info to route array*/
{ path: '', component: HomeComponent },
{ path: 'terms-of-use', component: TermsOfUseComponent },
{ path: 'about-us', component: AboutUsComponent },
{ path: 'home', component: HomeComponent },
{ path: 'my-account', component: MyAccountComponent, canActivate: [AuthGuardService], data: { roles: ['user', 'admin'] }},
{ path: 'my-saved-offers', component: MyOffersComponent, canActivate: [AuthGuardService], data: { roles: ['user', 'admin'] }},
{ path: 'log-in', component: LogInComponent },
{ path: 'forgot-password', component: ForgotPasswordComponent },
{ path: 'create-offer', component: CreateOfferComponent , canActivate: [AuthGuardService], data: { roles: ['user', 'admin'] }},
{ path: 'create-account', component: CreateAccountComponent },
{ path: 'browse-offers', component: BrowseOffersComponent },
{ path: 'offer-details/:id', component: OfferDetailsComponent },
{ path: 'book-offer/:id', component: BookOfferComponent },
{ path: 'book-offer', component: BookOfferComponent },
{ path: 'test', component: TestComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
