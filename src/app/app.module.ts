import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppFetchDataTsService } from './app.fetch-data.ts.service';
import { HttpClientModule } from '@angular/common/http';

/// Firebase ///
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
////////////////

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BrowseOffersComponent } from './browse-offers/browse-offers.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { FooterComponent } from './footer/footer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyOffersComponent } from './my-offers/my-offers.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BookOfferComponent } from './book-offer/book-offer.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { ImageUploadFormComponent } from './image-upload-form/image-upload-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    BrowseOffersComponent,
    OfferDetailsComponent,
    CreateAccountComponent,
    CreateOfferComponent,
    FooterComponent,
    ForgotPasswordComponent,
    HomeComponent,
    LogInComponent,
    MyAccountComponent,
    MyOffersComponent,
    NavBarComponent,
    BookOfferComponent,
    SideBarComponent,
    TermsOfUseComponent,
    ImageUploadFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [AppFetchDataTsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
