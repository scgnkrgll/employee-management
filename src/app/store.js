import {configureStore} from '@reduxjs/toolkit';
import {employeesSlice} from '../features/employees/employees-slice';

export const store = configureStore({
  reducer: {
    employees: employeesSlice.reducer,
  },
});

/**
 * The root state inferred from the Redux store.
 * @typedef {ReturnType<typeof store.getState>} RootState
 */

/**
 * The dispatch type inferred from the Redux store.
 * @typedef {typeof store.dispatch} AppDispatch
 */
