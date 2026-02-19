import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { ListInstructorsDto } from './dto/list-instructors.dto';

@Controller('instructors')
export class InstructorsController {
  constructor(private readonly service: InstructorsService) {}

  @Get()
  findAll(@Query() query: ListInstructorsDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const instructor = await this.service.findOne(id);
    if (!instructor) {
      throw new NotFoundException(`Instrutor com id "${id}" não encontrado`);
    }
    return instructor;
  }
}
