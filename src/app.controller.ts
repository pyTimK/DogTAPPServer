import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import * as admin from 'firebase-admin';
const {
  initializeApp,
  applicationDefault,
  cert,
} = require('firebase-admin/app');
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require('firebase-admin/firestore');

const tempDogId = '68koHQBo46DErlaJJrNf';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  async getHello(
    @Query('altitude') altitude: number,
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('year') year: number,
    @Query('month') month: number,
    @Query('day') day: number,
    @Query('hour') hour: number,
    @Query('minute') minute: number,
    @Query('second') second: number,
  ) {
    let data: string = '';
    await admin
      .firestore()
      .collection('record')
      .doc(tempDogId)
      .collection('date')
      .doc(
        `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`,
      )
      .collection('location')
      .doc(
        `${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}:${
          second < 10 ? '0' : ''
        }${second}`,
      )
      .set({
        altitude,
        latitude,
        longitude,
        timestamp: Timestamp.fromDate(
          new Date(year, month, day, hour, minute, second),
        ),
      });
    // .add.get()
    // .then((snapshot) => {
    //   snapshot.forEach((doc) => {
    //     console.log(doc.id, '=>', doc.data());
    //     data += doc.id;
    //   });
    // });
    console.log(
      altitude,
      latitude,
      longitude,
      year,
      month,
      day,
      hour,
      minute,
      second,
    );
    return altitude;
    // return this.appService.getHello();
  }
}
