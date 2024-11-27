import React, { useContext, useEffect, Suspense, lazy } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { ChatContext } from '@/app/chat-context';

const DbEditor = lazy(() => import('@/components/chat/db-editor'));
const ChatContainer = lazy(() => import('@/components/chat/chat-container'));

function Chat() {

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const id = searchParams?.get('id') ?? '';
  const scene = searchParams?.get('scene') ?? '';
  
  const { isContract, setIsContract, setIsMenuExpand } = useContext(ChatContext);

  useEffect(() => {
    // 仅初始化执行，防止dashboard页面无法切换状态
    setIsMenuExpand(scene !== 'chat_dashboard');
    // 路由变了要取消Editor模式，再进来是默认的Preview模式
    if (id && scene) {
      setIsContract(false);
    }
  }, [id, scene]);

  return <>{isContract ? <DbEditor /> : <ChatContainer />}</>;
}

export default Chat;
