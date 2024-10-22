import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/core/guard/admin.guard';
import { LocationComponent } from './pages/location/location.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { UpdateLocationComponent } from './pages/update-location/update-location.component';

const routes: Routes = [
  {
    path: "",
    //canActivate: [AdminGuard], 
    component: LocationsComponent
  },
  {
    path: "add-location",
    //canActivate: [AdminGuard], 
    component: UpdateLocationComponent
  },
  {
    path: ":id",
    //canActivate: [AdminGuard], 
    component: LocationComponent
  }, 
  {
    path: ":id/update-location",
    //canActivate: [AdminGuard], 
    component: UpdateLocationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }
