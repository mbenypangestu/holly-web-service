import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Injectable()
export class DatabaseService {
  private readonly envConfig: { [key: string]: string };

  constructor() {}
}
