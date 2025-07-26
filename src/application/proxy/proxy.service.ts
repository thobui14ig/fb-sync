import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProxyDto } from './dto/create-proxy.dto';
import { UpdateProxyDto } from './dto/update-proxy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProxyEntity, ProxyStatus } from './entities/proxy.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { delay } from 'src/common/utils/helper';

@Injectable()
export class ProxyService {
  proxies: ProxyEntity[] = []
  constructor(
    @InjectRepository(ProxyEntity)
    private repo: Repository<ProxyEntity>,
  ) { }

  findOne(id: number) {
    return this.repo.findOne({
      where: {
        id,
      },
    });
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async cronjobRandomProxy() {
    const proxies = await this.repo.find({
      where: {
        status: ProxyStatus.ACTIVE,
      }
    })

    this.proxies = proxies
  }

  async getRandomProxy() {
    if (this.proxies.length === 0) {
      await delay(5000)
      return this.getRandomProxy()
    }
    const randomIndex = Math.floor(Math.random() * this.proxies?.length);
    const randomProxy = this.proxies[randomIndex];

    return randomProxy
  }

  updateProxyFbBlock(proxy: ProxyEntity) {
    return this.repo.save({ ...proxy, isFbBlock: true })
  }

  updateProxyDie(proxy: ProxyEntity, errorCode?: string) {
    return this.repo.update(proxy.id, { status: ProxyStatus.IN_ACTIVE });
  }

  updateProxyActive(proxy: ProxyEntity) {
    return this.repo.update(proxy.id, { status: ProxyStatus.ACTIVE })
  }

  async updateActiveAllProxy() {
    const allProxy = await this.repo.find({
      where: {
        status: ProxyStatus.IN_ACTIVE
      }
    })
    for (const proxy of allProxy) {
      await this.updateProxyActive(proxy)
    }
  }
}
