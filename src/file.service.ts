import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FileService {
  private dataFile = 'data.json';

  saveData(data: any) {
    fs.writeFileSync(this.dataFile, JSON.stringify(data));
  }

  getData() {
    if (!fs.existsSync(this.dataFile)) {
      return [];
    }

    const data = fs.readFileSync(this.dataFile);
    return JSON.parse(data.toString());
  }
}
