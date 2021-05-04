import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FathymSharedModule, MaterialModule } from '@lcu/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './controls/home/home.component';
import { LcuDocumentationModule } from '@lowcodeunit/lcu-documentation-common';
import { ThemeBuilderModule } from '@lowcodeunit/theme-builder-common';
import { BuilderComponent } from './controls/builder/builder.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BuilderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FathymSharedModule,
    MaterialModule,
    FlexLayoutModule,
    LcuDocumentationModule.forRoot(),
    ThemeBuilderModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ThemeBuilderModule]
})
export class AppModule { }
