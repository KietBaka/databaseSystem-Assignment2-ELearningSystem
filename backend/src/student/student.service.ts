import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.student.findMany({
      include: {
        user: {
          select: {
            username: true,
            fullname: true,
            email: true,
          },
        },
        department: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.student.findUnique({
      where: { id },
      include: {
        user: true,
        department: true,
        enrollment: {
          include: {
            course: {
              include: {
                subject: true,
              },
            },
          },
        },
      },
    });
  }

  async getGPA(id: number) {
    const student = await this.prisma.student.findUnique({
      where: { id },
      select: {
        gpa: true,
        earned_credits: true,
        num_courses_enrolled: true,
        num_courses_completed: true,
        user: {
          select: {
            fullname: true,
          },
        },
      },
    });

    return student;
  }
}
