import { Injectable } from "@nestjs/common";

@Injectable()
export class ProfileService {

    profile() {

        return {
            fullname: 'Mateus chioquetta Varnier',
            username: 'Tamis2k',
            description: 'Apaixonado por tecnologia, carros',
            createdAt: '2022-08-13'
        }

    }

}
