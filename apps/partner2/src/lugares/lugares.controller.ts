import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CriarLugarRequest } from './request/criar-lugar.request';
import { AtualizarLugarRequest } from './request/atualizar-lugar.request';
import { SpotsService } from '@app/core/spots/spots.service';

@Controller('eventos/:eventoId/lugares')
export class LugaresController {
  constructor(private readonly spotsService: SpotsService) {}

  @Post()
  create(
    @Body() criarLugarRequest: CriarLugarRequest,
    @Param('eventoId') eventoId: string,
  ) {
    return this.spotsService.create({
      eventId: eventoId,
      name: criarLugarRequest.nome,
    });
  }

  @Get()
  findAll(@Param('eventoId') eventoId: string) {
    return this.spotsService.findAll(eventoId);
  }

  @Get(':id')
  findOne(
    @Param('eventoId') eventoId: string,
    @Param('lugarId') lugarId: string,
  ) {
    return this.spotsService.findOne(eventoId, lugarId);
  }

  @Patch(':id')
  update(
    @Param('eventoId') eventoId: string,
    @Param('lugarId') lugarId: string,
    @Body() atualizarLugarRequest: AtualizarLugarRequest,
  ) {
    return this.spotsService.update(eventoId, lugarId, {
      name: atualizarLugarRequest.nome,
    });
  }

  @Delete(':id')
  remove(
    @Param('eventoId') eventoId: string,
    @Param('lugarId') lugarId: string,
  ) {
    return this.spotsService.remove(eventoId, lugarId);
  }
}
