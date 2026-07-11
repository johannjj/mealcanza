import { getOrCreateAnonymousUserId } from '@/storage/anonymousUser';
import type { UserRepository } from './UserRepository';

export class LocalUserRepository implements UserRepository {
  async getAnonymousUserId(): Promise<string> {
    return getOrCreateAnonymousUserId();
  }
}
