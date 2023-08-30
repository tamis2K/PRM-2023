import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileService {
  profile() {
    return {
      fullname: 'Mateus Chioquetta Varnier',
      username: 'Tamis2k',
      description:
        'Apaixonado por tecnologia, carros, gol turbo, aviação, carros de arancada',
      createdAt: '2022-08-13',
    };
  }
}
