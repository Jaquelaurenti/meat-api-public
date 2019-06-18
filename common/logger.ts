import * as bunyan from 'bunyan'
import { environment } from './environment';

export const logger = bunyan.createLogger({
    name: environment.log.name,
    level: (<any>bunyan).resolveLevel(environment.log.level) // informações que dizem o que sua aplicação está fazendo mas isso de acordo com o nível selecionado
})