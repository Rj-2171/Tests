import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ParticlesConfig } from './particles-config';



@Component({
  selector: 'app-not-authenticated',
  templateUrl: './not-authenticated.component.html',
  styleUrls: ['./not-authenticated.component.scss']
})
export class NotAuthenticatedComponent implements OnInit {

  // @ViewChild('myDiv', { static: false }) particlesJS: ElementRef;

  // public particlesJS: any;

  constructor() { }

  ngOnInit() {
    // this.invokeParticles();

  }

  // public invokeParticles(): void {
  //   this.particlesJS.load('particles-js', ParticlesConfig, function () { });
  // }
}


