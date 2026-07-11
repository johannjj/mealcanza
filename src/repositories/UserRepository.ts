export interface UserRepository {
  getAnonymousUserId(): Promise<string>;
}

/**
 * Futuro: ApiUserRepository para sincronizar perfil con backend.
 */
