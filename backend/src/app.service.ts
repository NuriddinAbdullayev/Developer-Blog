import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService { getHello() { return { name: 'Devnotes API', status: 'ok', docs: '/api/docs' }; } }
