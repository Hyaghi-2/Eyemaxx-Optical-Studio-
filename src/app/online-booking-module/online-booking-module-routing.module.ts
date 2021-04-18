import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseContentComponent } from './components/base-content/base-content.component';

const routes: Routes = [{ path: 'base', component: BaseContentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineBookingModuleRoutingModule { }
