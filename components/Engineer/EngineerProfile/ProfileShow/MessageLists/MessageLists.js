import React from "react"
import * as moment from "moment"
const MessageLists = ({ userGuestUid, replies, messagesEndRef }) => {
  return (
    <div ref={messagesEndRef} className="p-2 overflow-y-scroll h-56">
      {replies.map(reply => {
        const userAuthenticatedUid = reply.user_uid
        const box = userAuthenticatedUid !== userGuestUid ? "box-left" : "box-right"
        const chatDirection = userAuthenticatedUid !== userGuestUid ? "flex justify-c-start" : "flex justify-c-end"
        return (
          <div key={reply.uid} className={`${chatDirection}`}>
            <div className={`chat-${box} text-white p-3 my-3`}>
              <p>{reply.reply}</p>
              <div className="p-2 mt-4 chat-author inline-block">
                <span className="bold">
                  {userAuthenticatedUid !== userGuestUid ? "You" : reply.fullname} - {moment(reply.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MessageLists
