import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';

class CreateToyDTO { constructor(public readonly name: string) { } }

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    @Render('index')
    getHello() {
        return {
            title: 'My First NestJS App'
        }
    }

    @Get('macskak')
    @Render('cats')
    async getMacskak() {
        return { cats: await this.appService.getAllCats() }
    }

    @Get('jatekok')
    async getJatekok() {
        return await this.appService.getAllToys();
    }

    @Get('macskaKeres')
    @Render('cat_search')
    async getMacskaKeres(@Query('szemszin') szemszin = '') {
        return { cats: await this.appService.getMacskaBySzemSzin(szemszin) }
    }

    @Get('ujJatek')
    @Render('new_toy')
    getUjJatek() {
        return {}
    }

    @Post('ujJatek')
    @Render('new_toy')
    async postUjJatek(@Body() params: CreateToyDTO) {
        return params.name ? {
            toy: { id: await this.appService.createJatek(params.name), nev: params.name }
        } : {
            message: 'invalid toy name'
        };
    }
}
