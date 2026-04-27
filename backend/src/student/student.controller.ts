import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Get(':id/gpa')
  async getGPA(@Param('id') id: string) {
    return this.studentService.getGPA(+id);
  }
}
