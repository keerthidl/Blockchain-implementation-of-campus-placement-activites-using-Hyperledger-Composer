/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { OrgRequirmentComponent } from './OrgRequirment/OrgRequirment.component';
import { notificationComponent } from './notification/notification.component';

import { placementCoordinatorComponent } from './placementCoordinator/placementCoordinator.component';
import { RecruiterComponent } from './Recruiter/Recruiter.component';
import { StudentComponent } from './Student/Student.component';

import { RequirmentComponent } from './Requirment/Requirment.component';
import { responseComponent } from './response/response.component';
import { NotifyComponent } from './Notify/Notify.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'OrgRequirment', component: OrgRequirmentComponent },
  { path: 'notification', component: notificationComponent },
  { path: 'placementCoordinator', component: placementCoordinatorComponent },
  { path: 'Recruiter', component: RecruiterComponent },
  { path: 'Student', component: StudentComponent },
  { path: 'Requirment', component: RequirmentComponent },
  { path: 'response', component: responseComponent },
  { path: 'Notify', component: NotifyComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
