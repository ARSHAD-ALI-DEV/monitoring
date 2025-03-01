import React, { useEffect, useState } from "react";
import { useShotStore } from "../store/useShotStore.js";
import "tailwindcss/tailwind.css";

const Inspect = () => {
  const { selectedUser, userActivity, shots } = useShotStore();
  const [pressedShot, setPressedShot] = useState(null);
  let pressTimer = null; // Press टाइमर ट्रैक करने के लिए

  useEffect(() => {
    console.log("Selected User:", selectedUser); // ✅ Check if user is selected
    if (selectedUser) {
        userActivity(); // सिर्फ तभी कॉल करो जब selectedUser null ना हो
    }
}, [selectedUser]); // Dependency array में selectedUser जोड़ो

  // **Long Press स्टार्ट करने का फंक्शन**
  const handlePressStart = (index) => {
    pressTimer = setTimeout(() => {
      setPressedShot(index);
    }, 600); // 600ms का delay ताकि accidental touch ना हो
  };

  // **Press छोड़ने पर Image वापस Normal करने का फंक्शन**
  const handlePressEnd = () => {
    clearTimeout(pressTimer);
    setPressedShot(null);
  };

  return (
    <div className="bg-white min-h-screen p-5">
      <h2 className="text-3xl font-bold text-indigo-800 mb-5">{selectedUser.username}'s screenshots</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {shots.length > 0 ? (
          shots.map((shot, index) => (
            <div
              key={index}
              className="bg-purple-50 p-3 rounded-lg shadow-lg overflow-hidden relative group border border-thistle"
            >
              <div className="text-gray-700 text-sm mb-2">
                <p><strong>Date:</strong> {new Date(shot.createdAt).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {new Date(shot.createdAt).toLocaleTimeString()}</p>
              </div>
              <div
                className="relative w-full h-40 overflow-hidden cursor-pointer"
                onTouchStart={() => handlePressStart(index)} // मोबाइल पर टच होल्ड करने के लिए
                onTouchEnd={handlePressEnd} // टच हटाने पर normal हो जाएगा
                onMouseDown={() => handlePressStart(index)} // माउस क्लिक होल्ड करने पर
                onMouseUp={handlePressEnd} // माउस छोड़ने पर normal
                onMouseLeave={handlePressEnd} // अगर बाहर चले गए तो भी normal
              >
                <img
                  src={shot.screenshot}
                  alt="Screenshot"
                  className="w-full h-full object-cover rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>

              {pressedShot === index && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                  <img
                    src={shot.screenshot}
                    alt="Enlarged Screenshot"
                    className="w-[90vw] h-[90vh] object-contain rounded-lg shadow-2xl"
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No screenshots available.</p>
        )}
      </div>
    </div>
  );
};

export default Inspect;
