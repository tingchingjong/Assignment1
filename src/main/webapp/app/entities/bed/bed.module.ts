import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IconnectSampleAppLabSharedModule } from 'app/shared/shared.module';
import { BedComponent } from './bed.component';
import { BedDetailComponent } from './bed-detail.component';
import { BedUpdateComponent } from './bed-update.component';
import { BedDeleteDialogComponent } from './bed-delete-dialog.component';
import { bedRoute } from './bed.route';

import { BedCreateComponent } from './bed-create.component';

@NgModule({
  imports: [IconnectSampleAppLabSharedModule, RouterModule.forChild(bedRoute)],
  declarations: [BedComponent, BedDetailComponent, BedUpdateComponent, BedDeleteDialogComponent, BedCreateComponent],
  entryComponents: [BedDeleteDialogComponent]
})
export class IconnectSampleAppLabBedModule {}
