import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateSpotRequest } from './request/create-spot.request';
import { UpdateSpotRequest } from './request/update-spot.request';
import { SpotsService } from '@app/core/spots/spots.service';

@Controller('events/:eventId/spots')
export class SpotsController {
  constructor(private readonly spotsService: SpotsService) {}

  @Post()
  create(
    @Body() createSpotRequest: CreateSpotRequest,
    @Param('eventId') eventId: string,
  ) {
    return this.spotsService.create({
      ...createSpotRequest,
      eventId,
    });
  }

  @Get()
  findAll(@Param('eventId') eventId: string) {
    return this.spotsService.findAll(eventId);
  }

  @Get(':id')
  findOne(@Param('eventId') eventId: string, @Param('spotId') spotId: string) {
    return this.spotsService.findOne(eventId, spotId);
  }

  @Patch(':id')
  update(
    @Param('eventId') eventId: string,
    @Param('spotId') spotId: string,
    @Body() updateSpotRequest: UpdateSpotRequest,
  ) {
    return this.spotsService.update(eventId, spotId, updateSpotRequest);
  }

  @Delete(':id')
  remove(@Param('eventId') eventId: string, @Param('spotId') spotId: string) {
    return this.spotsService.remove(eventId, spotId);
  }
}
