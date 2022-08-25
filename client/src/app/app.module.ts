import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';

import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';

import { AppComponent } from './app.component';
import { FooterComponent } from './common/components/footer/footer.component';
import { HeaderComponent } from './common/components/header/header.component';
import { HeroComponent } from './common/components/hero/hero.component';
import { HomeComponent } from './common/components/home/home.component';
import { NavigationComponent } from './common/components/navigation/navigation.component';
import { RepeatersComponent } from './common/components/repeaters/repeaters.component';

import { ErrorComponent } from './error/error.component';
import { PageNotFoundComponent } from './common/components/page-not-found/page-not-found.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        HeroComponent,
        HomeComponent,
        NavigationComponent,
        RepeatersComponent,
        ErrorComponent,
        PageNotFoundComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        FontAwesomeModule,
        FormsModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
