import { apiSlice } from '../../api/apiSlice';
import type { ApiResponse, ChatMessage, Conversation } from '@/types/api';

export interface SendMessagePayload {
  conversationId: string;
  data: {
    text: string;
    isFile: boolean;
    fileName: string;
    fileUrl: string;
    recipientId?: string;
    rfqId?: string;
  };
}

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query<ApiResponse<Conversation[]>, void>({
      query: () => '/messages/conversations',
      providesTags: ['Message'],
    }),
    getMessages: builder.query<ApiResponse<ChatMessage[]>, string>({
      query: (conversationId) => `/messages/conversations/${conversationId}`,
      providesTags: ['Message'],
    }),
    sendMessage: builder.mutation<ApiResponse<ChatMessage>, SendMessagePayload>({
      query: ({ conversationId, data }) => ({
        url: `/messages/conversations/${conversationId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Message'],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} = messagesApi;
