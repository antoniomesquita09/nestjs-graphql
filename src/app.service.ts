import { Injectable } from '@nestjs/common';

import RepoService from './repo.service';

@Injectable()
export class AppService {
  constructor(private readonly repoService: RepoService) {}

  async getHello(): Promise<string> {
    return `Total messages are ${await this.repoService.messageRepository.count()}!`;
  }
}
