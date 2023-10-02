import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Roles } from '../../models/roles';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  private userSubscription!: Subscription;
  roles!: string[] | undefined;
  userName!: string; 
  isAdmin = false;
  userId!: string;
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if (user) {
        if (user.roles) {
          this.roles = user?.roles;
          if (user.roles?.includes(Roles.ADMIN)) {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
          console.log(this.isAdmin);
        } else {
          this.userId = user?.userId;
          this.authService.getUserById(this.userId)
            .subscribe((res) => {
              this.userName = res.data.fullName;
            })
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
