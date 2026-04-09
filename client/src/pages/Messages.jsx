import React, { useState } from "react";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");

  // 🔥 DUMMY USERS / CHATS
  const chats = [
    {
      id: 1,
      user: {
        name: "Kalyan Municipal Corporation",
        profilePic: "https://i.pravatar.cc/150?img=12",
      },
      messages: [
        { sender: "them", text: "We received your complaint." },
        { sender: "me", text: "Thank you for responding!" },
      ],
    },
    {
      id: 2,
      user: {
        name: "Traffic Police",
        profilePic: "https://i.pravatar.cc/150?img=8",
      },
      messages: [
        { sender: "them", text: "Traffic issue resolved." },
      ],
    },
  ];

  // 🔥 SEND MESSAGE
  const handleSend = () => {
    if (!messageInput.trim()) return;

    const updatedChats = chats.map((chat) => {
      if (chat.id === selectedChat.id) {
        return {
          ...chat,
          messages: [
            ...chat.messages,
            { sender: "me", text: messageInput },
          ],
        };
      }
      return chat;
    });

    setSelectedChat({
      ...selectedChat,
      messages: [
        ...selectedChat.messages,
        { sender: "me", text: messageInput },
      ],
    });

    setMessageInput("");
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex">

      {/* 🔥 LEFT: CHAT LIST */}
      <div className="w-80 bg-white border-r overflow-y-auto">
        <h2 className="p-4 font-semibold text-lg">Messages</h2>

        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 ${
              selectedChat?.id === chat.id ? "bg-gray-100" : ""
            }`}
          >
            <img
              src={chat.user.profilePic}
              className="w-10 h-10 rounded-full"
              alt="user"
            />
            <div>
              <p className="font-medium">{chat.user.name}</p>
              <p className="text-xs text-gray-500">
                {chat.messages[chat.messages.length - 1]?.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 RIGHT: CHAT WINDOW */}
      <div className="flex-1 flex flex-col">

        {selectedChat ? (
          <>
            {/* HEADER */}
            <div className="p-4 border-b bg-white flex items-center gap-3">
              <img
                src={selectedChat.user.profilePic}
                className="w-10 h-10 rounded-full"
              />
              <h3 className="font-semibold">{selectedChat.user.name}</h3>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {selectedChat.messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    msg.sender === "me"
                      ? "bg-blue-500 text-white ml-auto"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div className="p-4 bg-white border-t flex gap-2">
              <input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded-full px-4 py-2 outline-none"
              />
              <button
                onClick={handleSend}
                className="bg-blue-500 text-white px-4 py-2 rounded-full"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;