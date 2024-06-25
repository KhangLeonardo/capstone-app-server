import { Module } from '@nestjs/common';
import { TermService } from './term.service';
import { TermController } from './term.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Term } from '../../common/entities/term.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Term])],
  controllers: [TermController],
  providers: [TermService],
})
export class TermModule {}
