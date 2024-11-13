import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  standalone: true,
  imports: [TranslateModule]
})
export class WelcomeComponent implements OnInit, OnDestroy {

  user = new User();
  private authUserSubs!: Subscription;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.authUserSubs = this.auth.authUser.subscribe(user => this.user = user?? new User());
  }

  ngOnDestroy() {
    if (this.authUserSubs) this.authUserSubs.unsubscribe();
  }

}
