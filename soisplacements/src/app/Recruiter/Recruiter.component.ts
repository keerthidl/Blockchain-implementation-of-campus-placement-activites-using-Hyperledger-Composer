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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RecruiterService } from './Recruiter.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-recruiter',
  templateUrl: './Recruiter.component.html',
  styleUrls: ['./Recruiter.component.css'],
  providers: [RecruiterService]
})
export class RecruiterComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  RecruiterId = new FormControl('', Validators.required);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  OrganizationName = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  PhoneNumber = new FormControl('', Validators.required);


  constructor(public serviceRecruiter: RecruiterService, fb: FormBuilder) {
    this.myForm = fb.group({
      RecruiterId: this.RecruiterId,
      firstName: this.firstName,
      lastName: this.lastName,
      OrganizationName: this.OrganizationName,
      email: this.email,
      PhoneNumber: this.PhoneNumber
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceRecruiter.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.sois.placement.Recruiter',
      'RecruiterId': this.RecruiterId.value,
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'OrganizationName': this.OrganizationName.value,
      'email': this.email.value,
      'PhoneNumber': this.PhoneNumber.value
    };

    this.myForm.setValue({
      'RecruiterId': null,
      'firstName': null,
      'lastName': null,
      'OrganizationName': null,
      'email': null,
      'PhoneNumber': null
    });

    return this.serviceRecruiter.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'RecruiterId': null,
        'firstName': null,
        'lastName': null,
        'OrganizationName': null,
        'email': null,
        'PhoneNumber': null
      });
      this.loadAll(); 
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.sois.placement.Recruiter',
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'OrganizationName': this.OrganizationName.value,
      'email': this.email.value,
      'PhoneNumber': this.PhoneNumber.value
    };

    return this.serviceRecruiter.updateParticipant(form.get('RecruiterId').value, this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceRecruiter.deleteParticipant(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceRecruiter.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'RecruiterId': null,
        'firstName': null,
        'lastName': null,
        'OrganizationName': null,
        'email': null,
        'PhoneNumber': null
      };

      if (result.RecruiterId) {
        formObject.RecruiterId = result.RecruiterId;
      } else {
        formObject.RecruiterId = null;
      }

      if (result.firstName) {
        formObject.firstName = result.firstName;
      } else {
        formObject.firstName = null;
      }

      if (result.lastName) {
        formObject.lastName = result.lastName;
      } else {
        formObject.lastName = null;
      }

      if (result.OrganizationName) {
        formObject.OrganizationName = result.OrganizationName;
      } else {
        formObject.OrganizationName = null;
      }

      if (result.email) {
        formObject.email = result.email;
      } else {
        formObject.email = null;
      }

      if (result.PhoneNumber) {
        formObject.PhoneNumber = result.PhoneNumber;
      } else {
        formObject.PhoneNumber = null;
      }

      this.myForm.setValue(formObject);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });

  }

  resetForm(): void {
    this.myForm.setValue({
      'RecruiterId': null,
      'firstName': null,
      'lastName': null,
      'OrganizationName': null,
      'email': null,
      'PhoneNumber': null
    });
  }
}
