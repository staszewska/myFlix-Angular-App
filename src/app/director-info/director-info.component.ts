import { Component, OnInit, Input, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-info',
  templateUrl: './director-info.component.html',
  styleUrl: './director-info.component.scss',
})
export class DirectorInfoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DirectorInfoComponent>,
    public fetchDirector: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    // Call method to fetch director details using directorName
    // this.getDirectorDetails(this.directorName);
  }

  //fetch director details
  // getDirectorDetails(directorName: string): void {
  //   this.fetchDirector.getDirector(directorName).subscribe((resp: any) => {
  //     this.directorName = resp;
  //     console.log('Director Details:', this.directorName);
  //     return this.directorName;
  //   });
  // }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
