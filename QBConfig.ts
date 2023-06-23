export const QBConfig = {
  credentials: {
    appId: Number(process.env.NEXT_PUBLIC_QB_APP_ID!),
    accountKey: process.env.NEXT_PUBLIC_QB_ACCOUNT_KEY!,
    authKey: process.env.NEXT_PUBLIC_QB_AUTH_KEY!,
    authSecret: process.env.NEXT_PUBLIC_QB_AUTH_SECRET!,
    sessionToken: "",
  },
  appConfig: {
    maxFileSize: 10 * 1024 * 1024,
    sessionTimeOut: 122,
    chatProtocol: {
      active: 2,
    },
    debug: true,
    on: {
      async sessionExpired(handleResponse: any, retry: any) {
        console.log(`Test sessionExpired....${handleResponse} ${retry}`);
      },
    },
    streamManagement: {
      enable: true,
    },
  },
};
