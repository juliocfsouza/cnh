import { InstructorsService, PaginatedInstructors } from './instructors.service';
import { CacheService } from '../cache/cache.service';

class NullCacheService extends CacheService {
  async get<T>(_key: string): Promise<T | null> {
    return null;
  }
  async set<T>(_key: string, _value: T, _ttl?: number): Promise<void> {}
  async del(_key: string): Promise<void> {}
}

describe('InstructorsService', () => {
  let service: InstructorsService;

  beforeEach(() => {
    service = new InstructorsService(new NullCacheService());
  });

  it('should return first page with default limit', async () => {
    const result: PaginatedInstructors = await service.findAll({});
    expect(result.data).toHaveLength(20);
    expect(result.nextCursor).not.toBeNull();
    expect(result.total).toBe(50);
  });

  it('should return correct page with cursor', async () => {
    const first = await service.findAll({ limit: 10 });
    expect(first.data).toHaveLength(10);
    expect(first.nextCursor).toBe('instructor-11');

    const second = await service.findAll({ cursor: first.nextCursor!, limit: 10 });
    expect(second.data).toHaveLength(10);
    expect(second.data[0].id).toBe('instructor-12');
  });

  it('should return null nextCursor on last page', async () => {
    const result = await service.findAll({ cursor: 'instructor-45', limit: 10 });
    expect(result.data).toHaveLength(5);
    expect(result.nextCursor).toBeNull();
  });

  it('should return a single instructor by id', async () => {
    const instructor = await service.findOne('instructor-1');
    expect(instructor).not.toBeNull();
    expect(instructor?.id).toBe('instructor-1');
  });

  it('should return null for unknown instructor', async () => {
    const instructor = await service.findOne('unknown-id');
    expect(instructor).toBeNull();
  });

  it('should return empty data for invalid cursor', async () => {
    const result = await service.findAll({ cursor: 'non-existent-id' });
    expect(result.data).toHaveLength(0);
    expect(result.nextCursor).toBeNull();
    expect(result.total).toBe(50);
  });
});
