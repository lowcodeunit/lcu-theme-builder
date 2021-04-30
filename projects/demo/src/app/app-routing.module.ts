import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './controls/home/home.component';
import { DocumentationComponent } from './controls/documentation/documentation.component';
import { BuilderComponent } from './controls/builder/builder.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'theme-builder', component: BuilderComponent },
  { path: '', redirectTo: 'theme-builder', pathMatch: 'full' },
  { path: 'documentation', component: DocumentationComponent }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
