import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.sois.placement{
   export class placementCoordinator extends Participant {
      pcId: string;
      firstName: string;
      lastName: string;
      email: string;
      PhoneNumber: number;
   }
   export class Recruiter extends Participant {
      RecruiterId: string;
      firstName: string;
      lastName: string;
      OrganizationName: string;
      email: string;
      PhoneNumber: number;
   }
   export class Student extends Participant {
      StudId: string;
      firstName: string;
      lastName: string;
      Branch: string;
      RegNumber: string;
      PhoneNumber: number;
   }
   export class OrgRequirment extends Asset {
      ReqId: string;
      recruiter: Recruiter;
   }
   export class notification extends Asset {
      notifyid: string;
      student: Student;
   }
   export class Requirment extends Transaction {
      Requirment: string;
      orgrequirment: OrgRequirment;
   }
   export class response extends Transaction {
      response: string;
      recruiter: Recruiter;
   }
   export class Notify extends Transaction {
      notification: string;
      student: Student;
   }
// }
