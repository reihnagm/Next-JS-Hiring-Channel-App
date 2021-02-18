import React, { useState, useEffect, useRef } from "react"
import { Grid, Input, Button } from "@material-ui/core"
import { connect } from "react-redux"
import * as moment from "moment"
import { getConversationLists, getReplyConversationReplies, getUserGuestUid, InsertIntoConversationReplies } from "../../../../../redux/actions/message"
import MessageLists from "../MessageLists/MessageLists"
import AvatarComponent from "../../../../Avatar/Avatar"
const ReplyLists = ({ getConversationLists, getCheckConversations, getReplyConversationReplies, InsertIntoConversationReplies, getUserGuestUid, replies, inputMessage, setInputMessage, conversationUid, userGuestUid, setConfirmConversationUid, setHideConversationLists, hideConversationLists }) => {
  const messagesEndRef = useRef(null)
  useEffect(() => {
    const fetchData = async () => {
      await getReplyConversationReplies(conversationUid)
      await getUserGuestUid(conversationUid)
    }
    fetchData()
  }, [getReplyConversationReplies, getUserGuestUid, conversationUid])
  const back = async () => {
    await getCheckConversations(userGuestUid)
    setConfirmConversationUid(null)
    setHideConversationLists(!hideConversationLists)
  }
  const handleMessage = event => {
    setInputMessage(event.target.value)
  }
  const handleEnterMessage = async event => {
    let payload = {
      id: new Date(),
      reply: inputMessage,
      createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss")
    }
    if (event.which === 13) {
      try {
        await InsertIntoConversationReplies(userGuestUid, payload)
      } catch (error) {
        console.log(err)
      } finally {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
        setInputMessage("")
      }
    }
  }
  return (
    <div>
      <div className="p-5 relative container-direct-message">
        <MessageLists replies={replies} messagesEndRef={messagesEndRef} userGuestUid={userGuestUid} />
        <div className="bar-bottom-message p-2">
          <Input fullWidth name="message" value={inputMessage} onChange={handleMessage} onKeyPress={handleEnterMessage} />
        </div>
      </div>
      <Button variant="contained" color="secondary" type="submit" onClick={back}>
        Back
      </Button>
    </div>
  )
}
const ConversationLists = ({ conversationLists, getCheckConversations, getReplyConversationReplies, InsertIntoConversationReplies, replies, getUserGuestUid, userGuestUid }) => {
  const [hide, setHide] = useState(true)
  const [hideConversationLists, setHideConversationLists] = useState(true)
  const [confirmConversationUid, setConfirmConversationUid] = useState(null)
  const [inputMessage, setInputMessage] = useState(null)
  const showDirectMessage = conversationUid => {
    setConfirmConversationUid(conversationUid)
    setHideConversationLists(false)
  }
  return (
    <div>
      {confirmConversationUid !== null && <ReplyLists getCheckConversations={getCheckConversations} setHideConversationLists={setHideConversationLists} hideConversationLists={hideConversationLists} setHide={setHide} hide={hide} conversationUid={confirmConversationUid} setConfirmConversationUid={setConfirmConversationUid} getReplyConversationReplies={getReplyConversationReplies} getUserGuestUid={getUserGuestUid} InsertIntoConversationReplies={InsertIntoConversationReplies} replies={replies} userGuestUid={userGuestUid} setInputMessage={setInputMessage} inputMessage={inputMessage} />}
      {hideConversationLists &&
        conversationLists &&
        conversationLists.map(conversation => {
          return (
            <Grid key={conversation.uid} onClick={() => showDirectMessage(conversation.uid)} container className="p-3 my-5 cursor-pointer conversations-item" direction="row" justify="center" alignItems="center">
              <Grid item xs={2}>
                <AvatarComponent imageSource={conversation.avatar} altName={conversation.fullname} type="engineers" width="60" height="60" />
              </Grid>
              <Grid item xs={10}>
                <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                  <Grid item>
                    <p className="my-1">{conversation.fullname}</p>
                  </Grid>
                  <Grid item>
                    <p className="mx-3"> {conversation.reply} </p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )
        })}
    </div>
  )
}
const mapStateToProps = state => ({
  replies: state.message.replies,
  userGuestUid: state.message.userGuestUid
})
export default connect(mapStateToProps, { getConversationLists, getReplyConversationReplies, getUserGuestUid, InsertIntoConversationReplies })(ConversationLists)
