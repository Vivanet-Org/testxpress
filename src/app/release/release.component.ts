import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.css']
})
export class ReleaseComponent implements OnInit {

  releaseImgPath: string = '/assets/images/release.png';
  sortByImg: string = '/assets/images/sort-by.png';
  eyeImg: string = '/assets/images/eye.png';
  editImg: string = '/assets/images/edit.png';

  constructor() { }

  ngOnInit(): void {
  }

}
