import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro-auth',
  templateUrl: './intro-auth.component.html',
  styleUrls: ['./intro-auth.component.css']
})
export class IntroAuthComponent implements OnInit {

  status = 'Initializing system...';
  done = false;

  currentImage = 'assets/fingerprint.png';

  constructor(private router: Router) {}

  ngOnInit() {
    this.runSequence();
  }

  async runSequence() {
    this.currentImage = 'assets/face.png'

    await this.delay(1500);
    this.status = 'Scanning fingerprint...';
    this.currentImage = 'assets/fingerprint.png';

    await this.delay(2000);
    this.status = 'Decrypting credentials...';
    this.currentImage = 'assets/lock.png';

    await this.delay(1500);
    this.status = 'Access granted';
    this.currentImage = 'assets/unlock.png';
    this.done = true;

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1500);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}