import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TasksStatus } from '../task-status.enum';

export class TaskStatusValidatoionPipe implements PipeTransform {
  readonly allowedStatus = [
    TasksStatus.OPEN,
    TasksStatus.IN_PROGRESS,
    TasksStatus.DONE,
  ];
  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatus.indexOf(status);
    return idx !== -1;
  }
}
