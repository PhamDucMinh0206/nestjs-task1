import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidatoionPipe } from './pipes/task-status-validator.pipe';
import { Task } from './task.entity';
import { TasksStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
  constructor(private tasksServer: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto) {
    return this.tasksServer.getTasks(filterDto);
  }
  @Get('/:id')
  getTaskByid(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksServer.getTaskById(id);
  }
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksServer.createTask(createTaskDto);
  }
  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksServer.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidatoionPipe) status: TasksStatus,
  ): Promise<Task> {
    return this.tasksServer.updateTaskStatus(id, status);
  }
}
