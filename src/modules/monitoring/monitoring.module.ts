import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '../comments/entities/comment.entity';
import { FacebookModule } from '../facebook/facebook.module';
import { LinkEntity } from '../links/entities/links.entity';
import { TokenEntity } from '../token/entities/token.entity';
import { MonitoringService } from './monitoring.service';
import { CookieEntity } from '../cookie/entities/cookie.entity';
import { ProxyEntity } from '../proxy/entities/proxy.entity';
import { DelayEntity } from '../setting/entities/delay.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([LinkEntity, CommentEntity, TokenEntity, CookieEntity, ProxyEntity, DelayEntity]), FacebookModule, HttpModule],
  controllers: [],
  providers: [MonitoringService],
  exports: [MonitoringService],
})
export class MonitoringModule { }
