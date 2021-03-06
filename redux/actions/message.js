import axios from "axios"
import store from "../store.js"
import { GET_CONVERSATION_LISTS, GET_CONVERSATION_LISTS_ERROR, GET_REPLY_CONVERSATION_REPLIES, GET_REPLY_CONVERSATION_REPLIES_ERROR, CHECK_CONVERSATIONS, CHECK_CONVERSATIONS_ERROR, GET_USER_GUEST_UID, GET_USER_GUEST_UID_ERROR, GET_CONVERSATION_UID, GET_CONVERSATION_UID_ERROR, INSERT_INTO_CONVERSATION_REPLIES, INSERT_INTO_CONVERSATION_REPLIES_ERROR, CHANGES_REPLY_TO_REALTIME } from "./types"

export const getConversationLists = userGuest => async dispatch => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_GET_MESSAGES}/conversation-lists/${userGuest}`)
    dispatch({
      type: GET_CONVERSATION_LISTS,
      payload: response.data.data
    })
  } catch (error) {
    dispatch({
      type: GET_CONVERSATION_LISTS_ERROR,
      payload: error.message
    })
  }
}
export const getReplyConversationReplies = conversationUid => async dispatch => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_GET_MESSAGES}/conversation-replies/${conversationUid}`)
    dispatch({
      type: GET_REPLY_CONVERSATION_REPLIES,
      payload: response.data.data
    })
  } catch (error) {
    dispatch({
      type: GET_REPLY_CONVERSATION_REPLIES_ERROR,
      payload: error.message
    })
  }
}
export const getCheckConversations = userGuest => async dispatch => {
  let userAuthenticated = store.getState().auth.user.uid
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_GET_MESSAGES}/check-conversations/${userAuthenticated}/${userGuest}`)
    if (response.data.data.length !== 0) {
      dispatch({
        type: CHECK_CONVERSATIONS,
        payload: response.data.data[0].uid
      })
    } else {
      dispatch({
        type: CHECK_CONVERSATIONS,
        payload: null
      })
    }
  } catch (error) {
    dispatch({
      type: CHECK_CONVERSATIONS_ERROR,
      payload: error.message
    })
  }
}
export const getUserGuestUid = conversationUid => async dispatch => {
  let userGuest
  let userAuthenticatedUid = store.getState().auth.user.uid
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_GET_MESSAGES}/user-guest/${conversationUid}`)
    if (response.data.data[0].user_guest_uid === userAuthenticatedUid) {
      userGuest = response.data.data[0].user_authenticated_uid
    } else {
      userGuest = response.data.data[0].user_guest_uid
    }
    dispatch({
      type: GET_USER_GUEST_UID,
      payload: userGuest
    })
  } catch (err) {
    dispatch({
      type: GET_USER_GUEST_UID_ERROR,
      payload: err.message
    })
  }
}
export const getConversationUid = userGuest => async dispatch => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_GET_MESSAGES}/conversation-uid/${userGuest}`)
    dispatch({
      type: GET_CONVERSATION_UID,
      payload: response.data.data
    })
  } catch (err) {
    dispatch({
      type: GET_CONVERSATION_UID_ERROR,
      payload: err.message
    })
  }
}
export const InsertIntoConversationReplies = (userGuestUid, payload) => async dispatch => {
  let userAuthenticatedUid = store.getState().auth.user.uid
  let reply = payload.reply
  let createdAt = payload.createdAt
  let userAuthenticatedName = store.getState().auth.user.fullname

  try {
    await axios.post(`${process.env.NEXT_PUBLIC_GET_MESSAGES}/conversation-replies/${userAuthenticatedUid}/${userGuestUid}`, {
      userAuthenticatedUid,
      reply,
      createdAt,
      userAuthenticatedName
    })
    dispatch({
      type: INSERT_INTO_CONVERSATION_REPLIES
    })
  } catch (err) {
    dispatch({
      type: INSERT_INTO_CONVERSATION_REPLIES_ERROR,
      payload: err.message
    })
  }
}
export const changesReplyToRealtime = payload => async dispatch => {
  let data = []
  data.push({
    payload
  })
  dispatch({
    type: CHANGES_REPLY_TO_REALTIME,
    payload: data
  })
}
