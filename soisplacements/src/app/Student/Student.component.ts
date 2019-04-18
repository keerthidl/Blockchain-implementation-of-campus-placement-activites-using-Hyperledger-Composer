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
import { StudentService } from './Student.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-student',
  templateUrl: './Student.component.html',
  styleUrls: ['./Student.component.css'],
  providers: [StudentService]
})
export class StudentComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  StudId = new FormControl('', Validators.required);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  Branch = new FormControl('', Validators.required);
  RegNumber = new FormControl('', Validators.required);
  PhoneNumber = new FormControl('', Validators.required);


  constructor(public serviceStudent: StudentService, fb: FormBuilder) {
    this.myForm = fb.group({
      StudId: this.StudId,
      firstName: this.firstName,
      lastName: this.lastName,
      Branch: this.Branch,
      RegNumber: this.RegNumber,
      PhoneNumber: this.PhoneNumber
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceStudent.getAll()
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
      $class: 'org.sois.placement.Student',
      'StudId': this.StudId.value,
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'Branch': this.Branch.value,
      'RegNumber': this.RegNumber.value,
      'PhoneNumber': this.PhoneNumber.value
    };

    this.myForm.setValue({
      'StudId': null,
      'firstName': null,
      'lastName': null,
      'Branch': null,
      'RegNumber': null,
      'PhoneNumber': null
    });

    return this.serviceStudent.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'StudId': null,
        'firstName': null,
        'lastName': null,
        'Branch': null,
        'RegNumber': null,
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
      $class: 'org.sois.placement.Student',
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'Branch': this.Branch.value,
      'RegNumber': this.RegNumber.value,
      'PhoneNumber': this.PhoneNumber.value
    };

    return this.serviceStudent.updateParticipant(form.get('StudId').value, this.participant)
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

    return this.serviceStudent.deleteParticipant(this.currentId)
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

    return this.serviceStudent.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'StudId': null,
        'firstName': null,
        'lastName': null,
        'Branch': null,
        'RegNumber': null,
        'PhoneNumber': null
      };

      if (result.StudId) {
        formObject.StudId = result.StudId;
      } else {
        formObject.StudId = null;
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

      if (result.Branch) {
        formObject.Branch = result.Branch;
      } else {
        formObject.Branch = null;
      }

      if (result.RegNumber) {
        formObject.RegNumber = result.RegNumber;
      } else {
        formObject.RegNumber = null;
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
      'StudId': null,
      'firstName': null,
      'lastName': null,
      'Branch': null,
      'RegNumber': null,
      'PhoneNumber': null
    });
  }
}
