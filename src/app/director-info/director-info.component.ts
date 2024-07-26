import { Component, OnInit, Input, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-info',
  templateUrl: './director-info.component.html',
  styleUrl: './director-info.component.scss',
})

/**
 * This component renders the director information dialog
 */
export class DirectorInfoComponent implements OnInit {
  /**
   * Creates an instance of DirectorInfoComponent.
   * @param dialogRef A reference to the dialog that contains this component.
   * @param fetchDirector Service to fetch director data.
   * @param data Data injected into the dialog.
   */

  constructor(
    public dialogRef: MatDialogRef<DirectorInfoComponent>,
    public fetchDirector: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  /**
   * This method will run when the component is initialized
   */
  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
