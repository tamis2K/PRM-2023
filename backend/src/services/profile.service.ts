import { Injectable } from "@nestjs/common";

@Injectable()
export class ProfileService {

    profile() {

        return {
            fullname: 'Libório de Oliveira Júnior',
            username: 'libajunior',
            description: 'Apaixonado por tecnologia, motos, familia, lecionar e facas',
            createdAt: '2022-08-13'
        }

    }

}