import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/Model/user';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-profile-sidenav',
  templateUrl: './profile-sidenav.component.html',
  styleUrls: ['./profile-sidenav.component.css'],
})
export class ProfileSidenavComponent implements OnInit {
  @Input() user!: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log('Sidenav Data: ' + this.userService.userData);
  }
}
