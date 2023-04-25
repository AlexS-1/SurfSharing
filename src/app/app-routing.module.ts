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

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
