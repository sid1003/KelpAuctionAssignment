import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-username-form',
  templateUrl: './username-form.component.html',
  styleUrls: ['./username-form.component.css']
})
export class UsernameFormComponent {

  userName: string = '';
  @Output() userNameSet = new EventEmitter<string>();

  setUserName() {
    if (this.userName.trim() !== '') {
      this.userNameSet.emit(this.userName);
    } else {
      alert('Please enter a valid name');
    }
  }

}
