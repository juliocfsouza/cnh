export interface Instructor {
  id: string;
  name: string;
  city: string;
  state: string;
  pricePerHour: number;
  bio: string;
  rating: number;
  totalReviews: number;
  categories: string[];
  createdAt: string;
}

export interface PaginatedInstructors {
  data: Instructor[];
  nextCursor: string | null;
  total: number;
}

const MOCK_INSTRUCTORS: Instructor[] = Array.from({ length: 50 }, (_, i) => ({
  id: `instructor-${i + 1}`,
  name: `Instrutor ${i + 1}`,
  city: ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Porto Alegre'][i % 5],
  state: ['SP', 'RJ', 'MG', 'PR', 'RS'][i % 5],
  pricePerHour: 80 + (i % 10) * 10,
  bio: `Instrutor credenciado com mais de ${5 + (i % 15)} anos de experiência.`,
  rating: Math.round((4 + (i % 10) / 10) * 10) / 10,
  totalReviews: 10 + i * 3,
  categories: ['B', i % 2 === 0 ? 'A' : 'C'],
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
}));

import { Injectable } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';
import { ListInstructorsDto } from './dto/list-instructors.dto';

@Injectable()
export class InstructorsService {
  constructor(private readonly cache: CacheService) {}

  async findAll(dto: ListInstructorsDto): Promise<PaginatedInstructors> {
    const limit = dto.limit ?? 20;
    const cacheKey = `instructors:list:cursor=${dto.cursor ?? 'start'}:limit=${limit}`;

    const cached = await this.cache.get<PaginatedInstructors>(cacheKey);
    if (cached) return cached;

    let startIndex = 0;
    if (dto.cursor) {
      const cursorIndex = MOCK_INSTRUCTORS.findIndex((i) => i.id === dto.cursor);
      if (cursorIndex === -1) {
        return { data: [], nextCursor: null, total: MOCK_INSTRUCTORS.length };
      }
      startIndex = cursorIndex + 1;
    }

    const slice = MOCK_INSTRUCTORS.slice(startIndex, startIndex + limit);
    const nextItem = MOCK_INSTRUCTORS[startIndex + limit];

    const result: PaginatedInstructors = {
      data: slice,
      nextCursor: nextItem ? nextItem.id : null,
      total: MOCK_INSTRUCTORS.length,
    };

    await this.cache.set(cacheKey, result, 60);
    return result;
  }

  async findOne(id: string): Promise<Instructor | null> {
    const cacheKey = `instructors:${id}`;

    const cached = await this.cache.get<Instructor>(cacheKey);
    if (cached) return cached;

    const instructor = MOCK_INSTRUCTORS.find((i) => i.id === id) ?? null;
    if (instructor) {
      await this.cache.set(cacheKey, instructor, 300);
    }
    return instructor;
  }
}
