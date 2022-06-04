import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GamesDto } from 'src/dto-classes/game.dto';
import { Games } from 'src/entities/game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Games)
    private gamesRepository: Repository<Games>,
  ) {}

  public async findAll(): Promise<Games[]> {
    return await this.gamesRepository.find();
  }

  public async InsertGame(gamesDto: GamesDto) {
    const gamesData = await this.gamesRepository.create(gamesDto);
    await this.gamesRepository.save(gamesData);
  }
}
