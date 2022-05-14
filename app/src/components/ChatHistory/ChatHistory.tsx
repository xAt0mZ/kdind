import "./ChatHistory.scss"

interface Props {
  chatHistory: string[]
}

export function ChatHistory({chatHistory}: Props) {
  const messages = chatHistory.map((msg, index) => (
    <p key={index}>{msg}</p>
  ));

  return (
    <div className="ChatHistory">
      <h2>Chat History</h2>
      {messages}
    </div>
  );
}
