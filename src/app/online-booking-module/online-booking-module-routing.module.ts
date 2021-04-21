import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseContentComponent } from './components/base-content/base-content.component';
import { ErrormessageComponent } from './components/errormessage/errormessage.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: 'base', component: BaseContentComponent },
  { path: 'error', component: ErrormessageComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineBookingModuleRoutingModule { }
