import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }
  initialState(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }
  getAllTask() {
    this.crudService.getAllTask().subscribe(
      (res) => {
        this.taskArr = res;
      },
      (err) => {
        alert('unable to get the list of Tasks');
      }
    );
  }

  addTask() {
    this.crudService.addTask(this.taskObj).subscribe(
      (res) => {
        this.initialState();
        this.addTaskValue = '';
      },
      (error) => {
        alert(error);
      }
    );
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(
      (res) => {
        this.initialState();
      },
      (err) => {
        alert('Failed to update task');
      }
    );
  }

  deleteTask(etask: Task) {
    this.crudService.deleteTask(etask).subscribe(
      (res) => {
        this.initialState();
      },
      (err) => {
        alert('Failed to delete task');
      }
    );
  }

  call(etask: Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }
}
