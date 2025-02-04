import { Test, TestingModule } from '@nestjs/testing';
import { AudiosController } from './audios.controller';

describe('AudiosController', () => {
  let controller: AudiosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AudiosController],
    }).compile();

    controller = module.get<AudiosController>(AudiosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
