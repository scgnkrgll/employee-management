import {createSlice, nanoid, createEntityAdapter} from '@reduxjs/toolkit';

/** @import { PayloadAction } from '@reduxjs/toolkit' */
/** @import { RootState } from '../../app/store' */

/**
 * @typedef {Object} Employee
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {`${number}-${number}-${number}`} dateOfEmployment ISO date string
 * @property {`${number}-${number}-${number}`} dateOfBirth ISO date string
 * @property {string} phone
 * @property {string} email
 * @property {"Analytics" | "Tech" } department
 * @property {"Junior" | "Medior" | "Senior"} position
 * @property {`${number}-${number}-${number}`} createdAt ISO date string
 */

/**
 * @typedef {Object} EmployeesState
 * @property {Employee[]} employees
 */

const employeesAdapter = createEntityAdapter({
  /**
   * @param {Employee} employee
   */
  selectId: (employee) => employee.id,
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

export const employeesSlice = createSlice({
  name: 'employees',
  initialState: employeesAdapter.getInitialState({}, [
    {
      id: 'UYYi0fV0F1y2kwEvIOAaF',
      firstName: 'Alice',
      lastName: 'Johnson',
      dateOfEmployment: '2023-01-01',
      dateOfBirth: '1993-01-01',
      phone: '555-1234',
      email: 'alice.johnson@example.com',
      department: 'Tech',
      position: 'Junior',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'p6FXZCq01JSZtrTF6',
      firstName: 'Bob',
      lastName: 'Smith',
      dateOfEmployment: '2022-01-01',
      dateOfBirth: '1998-01-01',
      phone: '555-5678',
      email: 'bob.smith@example.com',
      department: 'Analytics',
      position: 'Medior',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'BPZ_T_rqOt-vNry-q8alk',
      firstName: 'Charlie',
      lastName: 'Brown',
      dateOfEmployment: '2021-01-01',
      dateOfBirth: '1990-01-01',
      phone: '555-8765',
      email: 'charlie.brown@example.com',
      department: 'Tech',
      position: 'Senior',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'ijOIRBAhgseNuIfBxMcR-',
      firstName: 'David',
      lastName: 'Wilson',
      dateOfEmployment: '2020-01-01',
      dateOfBirth: '1985-01-01',
      phone: '555-4321',
      email: 'david.wilson@example.com',
      department: 'Analytics',
      position: 'Junior',
      createdAt: new Date().toISOString(),
    },
    {
      id: '5VKUX0T8uN69BFr6Lglon',
      firstName: 'Eve',
      lastName: 'Davis',
      dateOfEmployment: '2019-01-01',
      dateOfBirth: '1992-01-01',
      phone: '555-9876',
      email: 'eve.davis@example.com',
      department: 'Tech',
      position: 'Senior',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'o8Qu2jKvZa7C9-qDdOZUN',
      firstName: 'Frank',
      lastName: 'Moore',
      dateOfEmployment: '2018-01-01',
      dateOfBirth: '1980-01-01',
      phone: '555-6543',
      email: 'frank.moore@example.com',
      department: 'Analytics',
      position: 'Medior',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'V468j49HycIcafmyFDtrT',
      firstName: 'Grace',
      lastName: 'Lee',
      dateOfEmployment: '2017-01-01',
      dateOfBirth: '1988-01-01',
      phone: '555-3210',
      email: 'grace.lee@example.com',
      department: 'Tech',
      position: 'Junior',
      createdAt: new Date().toISOString(),
    },
    {
      id: '5gjRpcHLYbIA0sXpMUfSS',
      firstName: 'Hannah',
      lastName: 'Kim',
      dateOfEmployment: '2016-01-01',
      dateOfBirth: '1995-01-01',
      phone: '555-2468',
      email: 'hannah.kim@example.com',
      department: 'Tech',
      position: 'Senior',
      createdAt: new Date().toISOString(),
    },
    {
      id: '6gkR2jKvZa7C9-qDdOZUN',
      firstName: 'Ian',
      lastName: 'Brown',
      dateOfEmployment: '2015-01-01',
      dateOfBirth: '1990-01-01',
      phone: '555-6543',
      email: 'ian.brown@example.com',
      department: 'Analytics',
      position: 'Junior',
      createdAt: new Date().toISOString(),
    },
    {
      id: '7gkR2jKvZa7C9-qDdOZUN',
      firstName: 'Jack',
      lastName: 'White',
      dateOfEmployment: '2014-01-01',
      dateOfBirth: '1989-01-01',
      phone: '555-9876',
      email: 'jack.white@example.com',
      department: 'Tech',
      position: 'Senior',
      createdAt: new Date().toISOString(),
    },
  ]),
  reducers: {
    /**
     * Add a new employee to the state
     * @param {EmployeesState} state
     * @param {PayloadAction<Omit<Employee, 'id'>>} action
     */
    employeeAdded: (state, action) => {
      employeesAdapter.addOne(state, {
        id: nanoid(),
        createdAt: new Date().toISOString(),
        ...action.payload,
      });
    },
    employeeRemoved: employeesAdapter.removeOne,
    employeeUpdated: employeesAdapter.updateOne,
  },
});

export const {employeeAdded, employeeRemoved, employeeUpdated} =
  employeesSlice.actions;

export const employeesSelectors = employeesAdapter.getSelectors(
  /**
   * @param {RootState} state
   */
  (state) => state.employees
);

export default employeesSlice.reducer;
