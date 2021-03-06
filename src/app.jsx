import {PageLoading, SettingDrawer} from '@ant-design/pro-layout';
import {history} from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import {currentUser as queryCurrentUser} from './services/user';
import defaultSettings from '../config/defaultSettings';
import {message} from 'antd';

const loginPath = '/user/login';
/** 获取用户信息比较慢的时候会展示一个 loading */

export const initialStateConfig = {
  loading: <PageLoading/>,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 *
 */
export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      return await queryCurrentUser();
    } catch (error) {
      history.push(loginPath);
    }

    return undefined;
  }; // 如果不是登录页面，执行

  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }

  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
} // ProLayout 支持的api https://procomponents.ant.design/components/layout

export const layout = ({initialState, setInitialState}) => {
  return {
    rightContentRender: () => <RightContent/>,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer/>,
    onPageChange: () => {
      const {location} = history; // 如果没有登录，重定向到 login

      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({...preInitialState, settings}));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

export const request = {
  errorConfig: {},
  middlewares: [],
  requestInterceptors: [(url, options) => {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'source': 'scaling-disco-web'
    }
    return {
      url: `${url}`,
      options: {...options, headers, interceptors: true},
    };
  }],
  responseInterceptors: [async response => {
    if (response && response.status) {
      const result = await response.json();
      const {status} = response;
      if (status === 401) {
        message.error('未认证token, 重新登录');
        history.push(loginPath);
      }
      if (status === 404) {
        message.error('请求的资源不存在');
      }
      if (result.status !== 200) {
        message.error(result.message);
      }
      return result.data;
    } else {
      message.error('您的网络发生异常, 无法连接服务器')
      return response;
    }
  }],
}
