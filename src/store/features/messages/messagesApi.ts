import { apiSlice } from '../../api/apiSlice';

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => '/messages/conversations',
      providesTags: ['Message' as any],
    }),
    getMessages: builder.query({
      query: (conversationId) => `/messages/conversations/${conversationId}`,
      providesTags: ['Message' as any],
    }),
    sendMessage: builder.mutation({
      query: ({ conversationId, data }) => ({
        url: `/messages/conversations/${conversationId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Message' as any],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} = messagesApi;
