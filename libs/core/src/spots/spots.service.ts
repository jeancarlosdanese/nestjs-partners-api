import { Injectable } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { SpotStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SpotsService {
  constructor(private prismaService: PrismaService) {}

  async create(createSpotDto: CreateSpotDto & { eventId: string }) {
    const event = await this.prismaService.event.findFirst({
      where: { id: createSpotDto.eventId },
    }); // 👈 get event

    if (!event) throw new Error('Event not found');

    return this.prismaService.spot.create({
      data: {
        ...createSpotDto,
        status: SpotStatus.available,
      },
    }); // 👈 create spot
  }

  findAll(eventId: string) {
    return this.prismaService.spot.findMany({
      where: { eventId },
    }); // 👈 get all spots
  }

  findOne(eventId: string, spotId: string) {
    return this.prismaService.spot.findFirst({
      where: {
        id: spotId,
        eventId,
      },
    }); // 👈 get one spot
  }

  update(eventId: string, spotId: string, updateSpotDto: UpdateSpotDto) {
    return this.prismaService.spot.update({
      where: {
        id: spotId,
        eventId,
      },
      data: updateSpotDto,
    }); // 👈 update spot
  }

  remove(eventId: string, spotId: string) {
    return this.prismaService.spot.delete({
      where: {
        id: spotId,
        eventId,
      },
    }); // 👈 delete spot
  }
}
