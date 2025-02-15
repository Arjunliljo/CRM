import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from './socketConfig';
import { updateSelectedMessage, updateChats, setChats } from '../global/chatSlice';
import apiClient from './axiosInstance';


// export default GlobalSocketListener;
function GlobalSocketListener({ children }) {
  const dispatch = useDispatch();
  const chats = useSelector(state => state.chat.chats);

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      console.log("dssssssssssssata", data);
      // dispatch(updateSelectedMessage(data));

      const { chatId, message } = data;
      const chatExists = chats.some(chat => chat._id === chatId);

      console.log("chatExists", chatExists);

      if (chatExists) {
        dispatch(updateChats({ chatId, message }));
      } else {
        const fetchUpdatedChats = async () => {
          try {
            const response = await apiClient.get('/chat');
            dispatch(setChats(response.data));
          } catch (error) {
            console.error('Failed to fetch updated chats:', error);
          }
        };
        fetchUpdatedChats();
      }
    };

    // socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [dispatch, chats]);

  return children;
}
export default GlobalSocketListener;