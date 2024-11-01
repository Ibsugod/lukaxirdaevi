import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
}

interface ParentUser {
  id: number;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Your Name';

  users: User[] = [
    { id: 1, firstname: 'Alice', lastname: 'Smith', age: 22 },
    { id: 2, firstname: 'Bob', lastname: 'Johnson', age: 19 },
    { id: 3, firstname: 'Charlie', lastname: 'Brown', age: 25 },
    { id: 4, firstname: 'David', lastname: 'Wilson', age: 18 },
    { id: 5, firstname: 'Eve', lastname: 'Davis', age: 30 },
  ];

  parentUsers: ParentUser[] = [
    { id: 1, firstname: 'Alice', lastname: 'Smith', dateOfBirth: '1998-05-01', phoneNumber: '1234567890', email: 'alice@example.com' },
    { id: 2, firstname: 'Bob', lastname: 'Johnson', dateOfBirth: '2004-07-15', phoneNumber: '0987654321', email: 'bob@example.com' },
  ];

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      id: [null],
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(9)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(8)]],
    });
  }

  addUser() {
    if (this.userForm.valid) {
      const newUser: User = {
        id: this.users.length + 1,
        firstname: this.userForm.value.firstname,
        lastname: this.userForm.value.lastname,
        age: new Date().getFullYear() - new Date(this.userForm.value.dateOfBirth).getFullYear(),
      };
      this.users.push(newUser);
      this.userForm.reset();
    }
  }

  displayUsers() {
    console.log("Array is displayed by Display service:", this.users);
  }
}