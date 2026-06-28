import ChatComponent from "./chat-interface/Chat-Component";

const ResizeableComponent = () => {
  return (
    <div className="h-full bg-gray-50 p-8">
      {/* chat-input */}
      <ChatComponent/>
    </div>
  );
};
export default ResizeableComponent;
