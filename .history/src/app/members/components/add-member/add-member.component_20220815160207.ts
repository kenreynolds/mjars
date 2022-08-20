import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Member } from '../../models/member.model';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
})
export class AddMemberComponent implements OnInit {
  addMemberForm!: FormGroup;
  member: Member;

  submitButtonLabel = 'Add member';
  hasError: boolean = false;
  isInvalid: boolean = true;
  isSuccessful: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  arrlMemberTypes: any = [
    { value: 'Yes', text: 'Yes' },
    { value: 'No', text: 'No' },
  ];
  licenseClassTypes: any = [
    { value: 'Technician', text: 'Technician' },
    { value: 'General', text: 'General' },
    { value: 'Extra', text: 'Extra' },
  ];
  membershipTypes: any = [
    { value: 'Associate', text: 'Associate' },
    { value: 'Family', text: 'Family' },
    { value: 'Full member', text: 'Full member' },
    { value: 'Student', text: 'Student' },
  ];
  states: any = [
    { value: 'Alabama', text: 'Alabama' },
    { value: 'Alaska', text: 'Alaska' },
    { value: 'Arizona', text: 'Arizona' },
    { value: 'Arkansas', text: 'Arkansas' },
    { value: 'California', text: 'California' },
    { value: 'Connecticut', text: 'Connecticut' },
    { value: 'Delaware', text: 'Delaware' },
    { value: 'Florida', text: 'Florida' },
    { value: 'Georgia', text: 'Georgia' },
    { value: 'Hawaii', text: 'Hawaii' },
    { value: 'Idaho', text: 'Idaho' },
    { value: 'Indiana', text: 'Indiana' },
    { value: 'Iowa', text: 'Iowa' },
    { value: 'Kansas', text: 'Kansas' },
    { value: 'Kentucky', text: 'Kentucky' },
    { value: 'Louisiana', text: 'Louisiana' },
    { value: 'Maine', text: 'Maine' },
    { value: 'Maryland', text: 'Maryland' },
    { value: 'Massachusetts', text: 'Massachusetts' },
    { value: 'Michigan', text: 'Michigan' },
    { value: 'Minnesota', text: 'Minnesota' },
    { value: 'Mississippi', text: 'Mississippi' },
    { value: 'Missouri', text: 'Missouri' },
    { value: 'Montana', text: 'Montana' },
    { value: 'Nebraska', text: 'Nebraska' },
    { value: 'Nevada', text: 'Nevada' },
    { value: 'New Hampshire', text: 'New Hampshire' },
    { value: 'New Jersey', text: 'New Jersey' },
    { value: 'New Mexico', text: 'New Mexico' },
    { value: 'New York', text: 'New York' },
    { value: 'North Carolina', text: 'North Carolina' },
    { value: 'North Dakota', text: 'North Dakota' },
    { value: 'Ohio', text: 'Ohio' },
    { value: 'Oklahoma', text: 'Oklahoma' },
    { value: 'Oregon', text: 'Oregon' },
    { value: 'Pennsylvania', text: 'Pennsylvania' },
    { value: 'Rhode Island', text: 'Rhode Island' },
    { value: 'South Carolina', text: 'South Carolina' },
    { value: 'South Dakota', text: 'South Dakota' },
    { value: 'Tennessee', text: 'Tennessee' },
    { value: 'Texas', text: 'Texas' },
    { value: 'Utah', text: 'Utah' },
    { value: 'Vermont', text: 'Vermont' },
    { value: 'Virginia', text: 'Virginia' },
    { value: 'Washington', text: 'Washington' },
    { value: 'West Virginia', text: 'West Virginia' },
    { value: 'Wisconsin', text: 'Wisconsin' },
    { value: 'Wyoming', text: 'Wyoming' },
  ];

  private mode = 'create';
  private memberId: string;

  get arrlMembership() {
    return this.addMemberForm.get('arrlMember');
  }

  get callSign() {
    return this.addMemberForm.get('callSign');
  }

  get emailAddress() {
    return this.addMemberForm.get('emailAddress');
  }

  get firstName() {
    return this.addMemberForm.get('firstName');
  }

  get lastName() {
    return this.addMemberForm.get('lastName');
  }

  get licenseClass() {
    return this.addMemberForm.get('licenseClass');
  }

  get membershipType() {
    return this.addMemberForm.get('membershipType');
  }

  get phoneNumber() {
    return this.addMemberForm.get('phoneNumber');
  }

  constructor(
    public route: ActivatedRoute,
    private fb: FormBuilder,
    private membersService: MembersService
  ) {}

  // TODO: Add check to see if member already exists
  // TODO: Add ability to update member information

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        if (paramMap.has('memberId')) {
          this.mode = 'edit';
          this.memberId = paramMap.get('memberId');
          this.membersService.getMember(this.memberId)
            .subscribe(memberData => {
              this.member = {
                id: memberData._id,
                firstName: memberData.firstName,
                lastName: memberData.lastName,
                emailAddress: memberData.emailAddress,
                phoneNumber: memberData.phoneNumber,
                address: memberData.address,
                city: memberData.city,
                state: memberData.state,
                zipCode: memberData.zipCode,
                callSign: memberData.callSign,
                licenseClass: memberData.licenseClass,
                membershipType: memberData.membershipType,
                title: memberData.title,
                arrlMember: memberData.arrlMember,
                interests: memberData.interests,
                memberNotes: memberData.memberNotes,
              };
            });
        } else {
          this.mode = 'create';
          this.memberId = null;
        }
      });
    this.setupAddMemberFormControls();
    this.showMemberInfo();

    this.addMemberForm.valueChanges
      .subscribe(v => {
        if (this.addMemberForm.valid) {
          this.isInvalid = false;
        }
      });
  }

  saveMember() {
    if (this.addMemberForm.valid) {
      this.isInvalid = false;

      const memberData = {
        firstName: this.addMemberForm.value.firstName.trim(),
        lastName: this.addMemberForm.value.lastName.trim(),
        emailAddress: this.addMemberForm.value.emailAddress.trim(),
        phoneNumber: this.addMemberForm.value.phoneNumber.trim(),
        address: this.addMemberForm.value.address.trim(),
        city: this.addMemberForm.value.city.trim(),
        state: this.addMemberForm.value.state,
        zipCode: this.addMemberForm.value.zipCode.trim(),
        callSign: this.addMemberForm.value.callSign.trim(),
        licenseClass: this.addMemberForm.value.licenseClass,
        membershipType: this.addMemberForm.value.membershipType,
        title: this.addMemberForm.value.title.trim(),
        arrlMember: this.addMemberForm.value.arrlMember,
        interests: this.addMemberForm.value.interests.trim(),
        memberNotes: this.addMemberForm.value.memberNotes.trim(),
      };

      if (this.mode === 'create') {
        this.membersService.createMember(memberData);
      } else {
        this.membersService.updateMember(this.memberId, memberData);
      }

      this.clearFormData();
      this.scrollToTop();
    }
  }

  clearFormData() {
    this.addMemberForm.reset();
    this.addMemberForm.get('callSign')?.clearValidators();
    this.addMemberForm.get('callSign')?.updateValueAndValidity();
    this.addMemberForm.get('emailAddress')?.clearValidators();
    this.addMemberForm.get('emailAddress')?.updateValueAndValidity();
    this.addMemberForm.get('firstName')?.clearValidators();
    this.addMemberForm.get('firstName')?.updateValueAndValidity();
    this.addMemberForm.get('lastName')?.clearValidators();
    this.addMemberForm.get('lastName')?.updateValueAndValidity();
    this.addMemberForm.get('licenseClass')?.clearValidators();
    this.addMemberForm.get('licenseClass')?.updateValueAndValidity();
    this.addMemberForm.get('membershipType')?.clearValidators();
    this.addMemberForm.get('membershipType')?.updateValueAndValidity();
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  showMemberInfo() {
    if (this.mode === 'edit') {
      this.submitButtonLabel = 'Edit member';
      console.log(this.member);
      this.addMemberForm.patchValue({
        'address': this.member.address,
        'city': this.member.city,
        'interests': this.member.interests,
        'memberNotes': this.member.memberNotes,
        'state': this.member.state,
        'title': this.member.title,
        'zipCode': this.member.zipCode,
        'arrlMember': this.member.arrlMember,
        'licenseClass': this.member.licenseClass,
        'membershipType': this.member.membershipType,
        'emailAddress': this.member.emailAddress,
        'callSign': this.member.callSign,
        'firstName': this.member.firstName,
        'lastName': this.member.lastName,
        'phoneNumber': this.member.phoneNumber,
      });
    }
  }

  setupAddMemberFormControls() {
    this.addMemberForm = this.fb.group({
      address: [''],
      city: [''],
      interests: [''],
      memberNotes: [''],
      state: [''],
      title: [''],
      zipCode: [''],
      arrlMember: ['', Validators.required],
      licenseClass: ['', Validators.required],
      membershipType: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      callSign: ['', [Validators.required, Validators.pattern('^[A-Z0-9]*$')]],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      phoneNumber: ['', Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
    });
  }
}
