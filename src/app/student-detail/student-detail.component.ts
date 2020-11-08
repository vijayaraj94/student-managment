import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  maxDate: any;
  @ViewChild('studentTemplate') studentTemplate: TemplateRef<any>;
  studentForm =  {
    id: '',
    studentName: '',
    dob: '',
    age: '',
    contactNo: ''
  };
  studentGrid = [];
  displayedColumns: string[] = ['Student Name', 'Date of Birth', 'Age', 'Contact No.', 'actions'];

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.maxDate = new Date();
  }

  createNewRecord() {
    
    let dialogRef = this.dialog.open(this.studentTemplate, {
      disableClose: true,
        height: 'auto',
        width: '30%',
        autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      this.clearForm();
    });
  }
  onSubmit() {
    if(this.studentForm.id == '') {
      this.studentForm.id = Math.random().toString(36).substring(7);
      this.studentGrid.push(this.studentForm);
    } else {
      let index = this.studentGrid.findIndex((obj => obj.id == this.studentForm.id));
      this.studentGrid[index] = this.studentForm;
    }
    this.studentGrid = Object.assign([], this.studentGrid);
    this.dialog.closeAll();
  }
  editUser(item) {
    let editdata = Object.assign({}, item);
    console.log(editdata, '--edit');
    this.studentForm = editdata;
    const dialogRef = this.dialog.open(this.studentTemplate, {
      disableClose: true,
      width: '45%',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.clearForm();
    });
  }
  deleteUser(item) {
    let index = this.studentGrid.indexOf(item);
    this.studentGrid.splice(index, 1);
    this.studentGrid = Object.assign([], this.studentGrid);
  }
  clearForm() {
    this.studentForm =  {
      id: '',
      studentName: '',
      dob: '',
      age: '',
      contactNo: ''
    };
  }

}
