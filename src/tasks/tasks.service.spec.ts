import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './task.repository';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockTasksRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn()
});

const mockUser = {
    username: 'Ariel',
    id: 'someId',
    password: 'somePassword',
    tasks: []
}
describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result',async () => {
        tasksRepository.getTasks.mockResolvedValue('someValue')
        const result = await tasksService.getTasks(null,mockUser);
        expect(result).toEqual('someValue');  
    })
  });

  describe('getTaskById', () => {
    it('calls TaskRepository.findOne and returns the result', async () => {
      const mockTask = {
        title: 'Test Title',
        description: 'Test desc',
        id: 'someId',
        status: TaskStatus.OPEN
      }

      tasksRepository.findOne.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById('someId',mockUser);
      expect(result).toEqual(mockTask)
    })

    it('calls TaskRepository.findOne and handles an error', async () => {
      tasksRepository.findOne.mockResolvedValue(null);

      expect(tasksService.getTaskById('someId',mockUser)).rejects.toThrow(NotFoundException);


    })
  })
});
