import { SCHEMEOFWORK_URL } from '../constants';
import { apiSlice } from '../apiSlice';

export const schemeofworkApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSchemeOfWork: builder.mutation({
      query: (data) => ({
        url: `${SCHEMEOFWORK_URL}/add`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['SchemeOfWork'],
    }),
    getSchemeOfWorkById: builder.query({
      query: (schemeofworkId) => ({
        url: `${SCHEMEOFWORK_URL}/${schemeofworkId}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['SchemeOfWork'],
      keepUnusedDataFor: 5,
    }),
    getAllSchemeOfWork: builder.query({
      query: () => ({
        url: `${SCHEMEOFWORK_URL}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['SchemeOfWork'],
      keepUnusedDataFor: 5,
    }),
    updateSchemeOfWork: builder.mutation({
      query: (data) => ({
        url: `${SCHEMEOFWORK_URL}/${data.schemeofworkId}`,
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['SchemeOfWork'],
    }),

    deleteSchemeOfWork: builder.mutation({
      query: (schemeofworkId) => ({
        url: `${SCHEMEOFWORK_URL}/${schemeofworkId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['SchemeOfWork'],
    }),
  }),
});

export const {
  useCreateSchemeOfWorkMutation,
  useGetAllSchemeOfWorkQuery,
  useGetSchemeOfWorkByIdQuery,
  useUpdateSchemeOfWorkMutation,
  useDeleteSchemeOfWorkMutation,
} = schemeofworkApiSlice;
