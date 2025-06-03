import { Injectable, Logger } from '@nestjs/common';
import { User } from '../model/user.entity';
import { EntityManager, raw } from '@mikro-orm/postgresql';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly em: EntityManager) {} // Injeta o EntityManager
  /**
   * ESTE MÉTODO É VULNERÁVEL A SQL INJECTION!
   * Não use em produção.
   */
  async search(searchTerm: string): Promise<User[]> {
    return this.em
      .createQueryBuilder(User, 'u')
      .select('*')
      .where(raw(`'name ilike ${searchTerm}`));
  }

  // --- Cenário SEGURO (usando MikroORM corretamente) ---
  async safeFindUsersByName(name: string): Promise<User[]> {
    this.logger.log(`Executing SAFE query for name: '${name}'`);

    // O MikroORM utiliza prepared statements por padrão para todas as suas operações.
    // Não há risco de SQL Injection aqui, pois o valor de 'name' é enviado separadamente
    // para o banco de dados e não é concatenado diretamente na query SQL.
    return await this.em.find(User, { name });
  }
}
