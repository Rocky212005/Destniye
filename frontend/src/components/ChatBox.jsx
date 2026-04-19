import React from "react";

const ChatBox = ({ close }) => {
  return (
    <div className="fixed bottom-20 right-5 w-80 h-96 bg-slate-900 text-white rounded-xl shadow-xl flex flex-col">

      {/* 🔝 Header */}
      <div className="flex justify-between items-center p-3 border-b border-slate-700">
        <h3 className="font-semibold">Messages</h3>
        <button onClick={close}>❌</button>
      </div>

      {/* 💬 Messages */}
      <div className="flex-1 overflow-y-auto px-8 py-4 space-y-2">
        <div className="bg-slate-800 text-red-600 p-2 rounded-lg w-fit">
          This feature under Development !
        </div>
        
      </div>

      {/* ✏️ Input */}
      <div className="p-3 border-t border-slate-700 flex gap-2">
        <input
          type="text"
          placeholder="Type message..."
          className="flex-1 p-2 rounded bg-slate-800 outline-none"
        />
        <button className="bg-blue-500 px-3 rounded">Send</button>
      </div>

    </div>
  );
};

export default ChatBox;