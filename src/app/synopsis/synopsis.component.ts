import { Component, OnInit, Input, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrl: './synopsis.component.scss',
})
export class SynopsisComponent implements OnInit {
  /**
   * Creates an instance of SynopsisComponent.
   * @param dialogRef
   * @param fetchSynopsis
   * @param data
   */
  constructor(
    public dialogRef: MatDialogRef<SynopsisComponent>,
    public fetchSynopsis: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    // console.log(data);
  }

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
