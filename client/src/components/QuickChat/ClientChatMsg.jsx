import { PropTypes } from "prop-types";
import React from "react";
import styles from "./styles.module.scss";

function ChatContent(props) {
  const { isOwner, content } = props;

  return (
    <div
      className={`${styles.msgContent} ${
        isOwner ? styles.owner : styles.viewer
      }`}
    >
      {!isOwner && (
        <img
          src="https://res.cloudinary.com/dkawibquv/image/upload/v1670835488/cld-sample-5.jpg"
          alt=""
        />
      )}
      <div>
        <p>{content}</p>
      </div>
    </div>
  );
}

function ClientChatMsg(props) {
  const { isOwner } = props;
  return (
    <div className={styles.chatContainer}>
      <ChatContent
        isOwner={isOwner}
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quis officiis ut pariatur culpa dolorem consequatur voluptatibus provident accusantium vero numquam quasi est, inventore a qui aspernatur minima eligendi. Ducimus."
      />
      <ChatContent
        isOwner={false}
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      />
      <ChatContent
        isOwner={isOwner}
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quis officiis ut pariatur culpa dolorem consequatur voluptatibus provident accusantium vero numquam quasi est, inventore a qui aspernatur minima eligendi. Ducimus."
      />
      <ChatContent
        isOwner={isOwner}
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quis officiis ut pariatur culpa dolorem consequatur voluptatibus provident accusantium vero numquam quasi est, inventore a qui aspernatur minima eligendi. Ducimus."
      />
      <ChatContent
        isOwner={false}
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quis officiis ut pariatur culpa dolorem consequatur voluptatibus provident accusantium vero numquam quasi est, inventore a qui aspernatur minima eligendi. Ducimus."
      />
      <ChatContent
        isOwner={isOwner}
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quis officiis ut pariatur culpa dolorem consequatur voluptatibus provident accusantium vero numquam quasi est, inventore a qui aspernatur minima eligendi. Ducimus."
      />
    </div>
  );
}

ClientChatMsg.propTypes = {
  isOwner: PropTypes.bool.isRequired
};

ChatContent.propTypes = {
  isOwner: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired
};

export default ClientChatMsg;
