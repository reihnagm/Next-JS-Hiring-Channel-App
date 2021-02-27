import { GET_CONVERSATION_LISTS, GET_CONVERSATION_LISTS_ERROR, GET_REPLY_CONVERSATION_REPLIES, GET_REPLY_CONVERSATION_REPLIES_ERROR, CHECK_CONVERSATIONS, CHECK_CONVERSATIONS_ERROR, GET_USER_GUEST_UID, GET_USER_GUEST_UID_ERROR, GET_CONVERSATION_UID, GET_CONVERSATION_UID_ERROR, INSERT_INTO_CONVERSATIONS, INSERT_INTO_CONVERSATIONS_ERROR, INSERT_INTO_CONVERSATION_REPLIES, INSERT_INTO_CONVERSATION_REPLIES_ERROR, CHANGES_REPLY_TO_REALTIME } from "../actions/types"
const initialState = {
  userGuestUid: null,
  conversationUid: null,
  checkConversations: null,
  conversationLists: [],
  replies: [],
  error: {}
}
export default function message(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_CONVERSATION_LISTS:
      return {
        ...state,
        conversationLists: payload
      }
    case GET_CONVERSATION_LISTS_ERROR:
      return {
        ...state,
        error: payload
      }
    case GET_REPLY_CONVERSATION_REPLIES:
      return {
        ...state,
        replies: payload
      }
    case GET_REPLY_CONVERSATION_REPLIES_ERROR:
      return {
        ...state,
        error: payload
      }
    case GET_USER_GUEST_UID:
      return {
        ...state,
        userGuestUid: payload
      }
    case GET_USER_GUEST_UID_ERROR:
      return {
        ...state,
        error: payload
      }
    case CHECK_CONVERSATIONS:
      return {
        ...state,
        checkConversations: payload
      }
    case CHECK_CONVERSATIONS_ERROR:
      return {
        ...state,
        error: payload
      }
    case GET_CONVERSATION_UID:
      return {
        ...state,
        conversationUid: payload
      }
    case GET_CONVERSATION_UID_ERROR:
      return {
        ...state,
        error: payload
      }
    case INSERT_INTO_CONVERSATIONS:
      return {
        ...state
      }
    case INSERT_INTO_CONVERSATIONS_ERROR:
      return {
        ...state,
        error: payload
      }
    case CHANGES_REPLY_TO_REALTIME:
      return {
        ...state,
        replies: state.replies.concat(payload[0].payload)
      }
    case INSERT_INTO_CONVERSATION_REPLIES:
      return {
        ...state
      }
    case INSERT_INTO_CONVERSATION_REPLIES_ERROR:
      return {
        ...state,
        error: payload
      }
    default:
      return state
  }
}
