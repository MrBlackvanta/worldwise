import styles from "./Message.module.scss";

type MessageProps = {
  message: string;
};

function Message({ message }: MessageProps) {
  return (
    <p className={styles.message}>
      <span role="img" aria-label="wave emoji">
        👋
      </span>{" "}
      {message}
    </p>
  );
}

export default Message;
