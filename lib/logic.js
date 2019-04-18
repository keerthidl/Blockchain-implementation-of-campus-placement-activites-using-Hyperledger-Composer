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

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Organization requirment transaction 
 * @param {org.sois.placement.Requirment}Requirment
 * @transaction
 */

 function Requirment(Requirment){
     var factory = getFactory();
     var NS = 'org.sois.placements';

     //create the Recruiter 

     var recruiter = factory.newResoure(NS, 'recruiter','recruiter@email.com');
     var recruiterAddress = factory.newConcept(NS, 'Address');
     recruiterAddress.country = 'India';
     recruiter.address = recruiterAddress;

     //create the placementCoordinator 

     var placementCoordinator = factory.newResoure(NS, 'placementCoordinator','pc@email.com');
     var placementCoordinatorAddress = factory.newConcept(NS, 'Address');
     placementCoordinatorAddress.country = 'India';
     placementCoordinator.address = placementCoordinatorAddress;

     //create assert

     var OrgRequirment = factory.newResource(NS, 'OrgRequirment','Req_035');
     OrgRequirment.recruiter = factory.newRelationship(NS,'recruiter','recruiter@email.com');
     OrgRequirment.placementCoordinator = factory.newRelationship(NS,'placementCoordinator','pc@email.com');
     var DT = Requirment.timestamp;
     DT.setDate(Dt.getDate());
     OrgRequirment.DateTime = DT;
     OrgRequirment.expertise = softwareengineers;
     OrgRequirment.criteria = 55;
     OrgRequirment.requirment = 20;
    /*
     //notification assert 
     
     var notification = factory.newResource(NS, 'notification','notify_033');
     notification.Domainexpertise = softwareengineers;
     notification.criteria = 55;
     notification.OrgRequirment = factory.newRelationship(NS, 'OrgRequirment','Req_035');
    */
     //java script promises 

     return getParticipantRegistry(NS, +'.recruiter')
        .then(function (recruiterRegistry){
            return recruiterRegistry.addAll([recruiter]);
        })
        .then(function(){
            return getParticipantRegistry(NS, +'.placementCoordinator');
        })
        .then(function(placementCoordinatorRegistry){
            return placementCoordinatorRegistry.addAll([placementCoordinator]);
        })
        .then(function(){
            return getAssetRegistry(NS+ '.OrgRequirement');
        })
        .then(function(OrgRequirementRegistry){
            return OrgRequirementRegistry.addAll([OrgRequirementRegistry]);
        })
        .then(function(){
            return getAssetRegistry(NS+ '.notification');
        })
        .then(function(notification){
            return notificationRegistry.addAll([notification]);
        })
    }

/**
 * notification message to the students 
 * @param {org.sois.placement.response}response
 * @transaction
 */

function response(response){
    var factory = getFactory();
    var NS = 'org.sois.placements';

    //create the student 

    var student = factory.newResoure(NS, 'student','studentId');
    var studentAddress = factory.newConcept(NS, 'Address');
    recruiterAddress.country = 'India';
    student.address = recruiterAddress;

    //create the placementCoordinator 

    var placementCoordinator = factory.newResoure(NS, 'placementCoordinator','pc@email.com');
    var placementCoordinatorAddress = factory.newConcept(NS, 'Address');
    placementCoordinatorAddress.country = 'India';
    placementCoordinator.address = placementCoordinatorAddress;
    /*
    //create assert

    var OrgRequirment = factory.newResource(NS, 'OrgRequirment','Req_035');
    OrgRequirment.recruiter = factory.newRelationship(NS,'recruiter','recruiter@email.com');
    OrgRequirment.placementCoordinator = factory.newRelationship(NS,'placementCoordinator','pc@email.com');
    var DT = Requirment.timestamp;
    DT.setDate(Dt.getDate()+1);
    OrgRequirment.DateTime = DT;
    OrgRequirment.expertise = softwareengineers;
    OrgRequirment.criteria = 55;
    OrgRequirment.requirment = 20;
*/
    //notification assert 
    
    var notification = factory.newResource(NS, 'notification','notify_033');
    notification.Domainexpertise = softwareengineers;
    notification.criteria = 55;
    notification.OrgRequirment = factory.newRelationship(NS, 'OrgRequirment','Req_035');

    //java script promises 

    return getParticipantRegistry(NS, +'.student')
       .then(function (studentRegistry){
           return recruiterRegistry.addAll([student]);
       })
       .then(function(){
           return getParticipantRegistry(NS, +'.placementCoordinator');
       })
       .then(function(placementCoordinatorRegistry){
           return placementCoordinatorRegistry.addAll([placementCoordinator]);
       })
       /*
       .then(function(){
           return getAssetRegistry(NS+ '.OrgRequirement');
       })
       .then(function(OrgRequirementRegistry){
           return OrgRequirementRegistry.addAll([OrgRequirementRegistry]);
       })
       */
       .then(function(){
           return getAssetRegistry(NS+ '.notification');
       })
       .then(function(notification){
           return notificationRegistry.addAll([notification]);
       })
   }

/*     
 }
async function Requirment(tx) {
    // Save the old value of the asset.
    const oldValue = tx.asset.value;

    // Update the asset with the new value.
    tx.asset.value = tx.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.sois.placement.SampleAsset');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.sois.placement', 'SampleEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
}
*/
