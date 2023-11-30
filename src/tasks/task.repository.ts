import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TaskRespository extends Repository<Task> {
  async getTask(filterDto: GetTaskFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status =:status', { status });
    }
    if (search) {
      query.andWhere(
        'task.tilte LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TasksStatus.OPEN;
    await task.save();
    return task;
  }
}
