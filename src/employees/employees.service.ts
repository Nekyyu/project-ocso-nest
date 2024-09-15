import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {v4 as uuid} from "uuid";
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeReposirory: Repository<Employee>
  ){}
  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeReposirory.save(createEmployeeDto)
    return employee
  }

findAll() {
    //retorne todos los empleados
  return this.employeeReposirory.find();
  }

   findOne(id: string) {
    const employee = this.employeeReposirory.findOneBy({
      employeeId: id
    })
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeReposirory.preload({
      employeeId: id,
      ...updateEmployeeDto
    })
    this.employeeReposirory.save(employeeToUpdate)
    return employeeToUpdate;
  }

  remove(id: string) {
    this.employeeReposirory.delete({
      employeeId: id
    })
    return {
      message: "Employee deleted"
    }
  }
}
