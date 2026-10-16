import { Injectable } from '@nestjs/common';
import mysql, { ResultSetHeader } from 'mysql2/promise';
import { Cat } from './types/Cat.js';
import { Toy } from './types/Toy.js';

const msqlc = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'macskak'
});

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    async getAllCats() {
        const [rs, flds] = await msqlc.execute('SELECT * FROM macskak');
        return rs as Cat[];
    }

    async getAllToys() {
        const [rs, flds] = await msqlc.execute('SELECT *FROM jatekok');
        return rs as Toy[];
    }

    async getMacskaBySzemSzin(szemszin: string) {
        const [rs, flds] = await msqlc.execute('SELECT * FROM macskak WHERE szem_szin LIKE ?', [`%${szemszin}%`])
        return rs as Cat[];
    }

    async createJatek(nev: string) {
        const [rs] = await msqlc.execute('INSERT INTO jatekok(nev) VALUES(?)', [nev])
        return (rs as ResultSetHeader).insertId;
    }
}
