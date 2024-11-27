import { useState, useContext, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ChatContext, ChatContextProvider } from '@/app/chat-context';
import { ConfigProvider, MappingAlgorithm, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import classNames from 'classnames';
import SideBar from '@/components/layout/side-bar';
import { ThemeProvider } from '@mui/joy';
import { joyTheme } from '@/defaultTheme';
import { useTranslation } from 'react-i18next';

type GlobImport = Record<string, (() => Promise<React.ComponentType>) | React.ComponentType | (() => Promise<{ default: React.ComponentType }>)>;
const modules: GlobImport = import.meta.glob('../pages/{index.tsx,*/index.tsx}', { eager: true }) as GlobImport
const pages = Object.keys(modules).map(key => modules[key])
console.log(modules, pages)

const antdDarkTheme: MappingAlgorithm = (seedToken, mapToken) => {
  return {
    ...theme.darkAlgorithm(seedToken, mapToken),
    colorBgBase: '#232734',
    colorBorder: '#828282',
    colorBgContainer: '#232734',
  };
};
function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isMenuExpand, mode } = useContext(ChatContext);
  const { i18n } = useTranslation();

  return (
    <ConfigProvider
      locale={i18n.language === 'en' ? enUS : zhCN}
      theme={{
        token: {
          colorPrimary: '#0069FE',
          borderRadius: 4,
        },
        algorithm: mode === 'dark' ? antdDarkTheme : undefined,
      }}
    >
      <div className="flex w-screen h-screen overflow-hidden">
        <div className={classNames('transition-[width]', isMenuExpand ? 'w-60' : 'w-20', 'hidden', 'md:block')}>
          <SideBar />
        </div>
        <div className="flex flex-col flex-1 relative overflow-hidden">{children}</div>
      </div>
    </ConfigProvider>
  );
}


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <ThemeProvider theme={joyTheme}>
    <LayoutWrapper>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </LayoutWrapper>
  </ThemeProvider>
    </>
  )
}

export default App
