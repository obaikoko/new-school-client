import { STUDENTS_URL } from '../constants';
import { apiSlice } from '../apiSlice';

export const studentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    studentLogin: builder.mutation({
      query: (data) => ({
        url: `${STUDENTS_URL}/auth`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),

 
  }),
});

export const { useStudentLoginMutation, useLogoutMutation } = studentsApiSlice;
