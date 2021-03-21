import { Injectable } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Injectable()
export class RteService {

    constructor(private dataService: DataService) {};

    getRTEServiceData() {
        return this.dataService.getData('/api/StudentRTEAllocation', true);
      }
      getRTEServiceDistrictData(id) {
        return this.dataService.getData('/api/RTESchoolAllocation/?district_name='+id, true);
      }
     

}
