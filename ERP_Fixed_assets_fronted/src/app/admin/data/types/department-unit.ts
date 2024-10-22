export interface DepartmentUnit {
  id: number;
  departmentName: string;
  departmentCode: string;
  department: string;
  deletedFlag: boolean;
  departmentUnits: [
    {
      id: number;
      department_fk: number;
      departmentName: string;
      departmentCode: string;
    }
  ];
}
