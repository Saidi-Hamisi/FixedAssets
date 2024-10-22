import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.sass']
})
export class UpdatePasswordComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService) { }

  getLoggedInUserId(){
    this.tokenStorage.getUser()
  }

  ngOnInit(): void {
    this.getLoggedInUserId();
  }

}
