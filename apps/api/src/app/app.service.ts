import { Injectable } from '@nestjs/common';

import demoData from './data.json'
;
@Injectable()
export class AppService {
  getDemoData() {
    return demoData;
  }
}
