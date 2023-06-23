import * as React from "react";
// @ts-ignore
import * as QB from "quickblox/quickblox";
import { QBConfig } from "@/QBConfig";
import { Dialog, User } from "@/types/quickblox";

type UserData = { email: string; password: string };

interface QBContextState {
  Quickblox: any;
  createSession: (userData: UserData) => Promise<any>;

  currentUser: User | null;
  isLoading: boolean;

  dialogs: Dialog[];
}

const QBContext = React.createContext<QBContextState | null>(null);

export const QuickbloxProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [Quickblox] = React.useState(() => QB);
  const [session, setSession] = React.useState<any | null>(null);
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [dialogs, setDialogs] = React.useState<Dialog[]>([]);

  const [messageReceived, setMessageReceived] = React.useState(true);

  React.useEffect(() => {
    QB.init(
      QBConfig.credentials.appId,
      QBConfig.credentials.authKey,
      QBConfig.credentials.authSecret,
      QBConfig.credentials.accountKey,
    );

    QB.chat.onMessageListener = (userId: number, message: any) => {
      setMessageReceived(true);
    };

    console.log(Quickblox);
  }, [Quickblox]);

  React.useEffect(() => {
    if (!currentUser) return;

    if (messageReceived) {
      QB.chat.dialog.list({}, function (error: any, dialogs: any) {
        if (error) {
          setMessageReceived(false);
        } else {
          setDialogs(dialogs.items);
          setMessageReceived(false);
        }
      });
    }
  }, [currentUser, messageReceived]);

  const createSession = async (userData: UserData) => {
    setIsLoading(true);
    const sessionRes: any = await new Promise((resolve, reject) => {
      Quickblox.createSession(userData, (err: any, sessionRes: any) => {
        if (err) {
          console.log("CREATE SESSION ERROR: ", err);
          setIsLoading(false);
          return reject(err);
        }

        console.log(sessionRes);

        setSession(sessionRes);

        resolve(sessionRes);
      });
    });

    const userId = sessionRes.user_id;
    const password = sessionRes.token;

    await new Promise((resolve, reject) => {
      Quickblox.chat.connect(
        { userId, password },
        (err: any, contactList: any) => {
          if (err) {
            console.log("CHAT CONNECT ERROR: ", err);
            setIsLoading(false);
            return reject(err);
          }

          resolve(contactList);
        },
      );
    });

    await new Promise((resolve, reject) => {
      Quickblox.users.get({ email: userData.email }, (err: any, user: any) => {
        if (err) {
          console.log("GET CURRENT USER ERROR: ", err);
          setIsLoading(false);
          return reject(err);
        }

        setCurrentUser(user);
        resolve(user);
      });
    });

    setIsLoading(false);
  };

  return (
    <QBContext.Provider
      value={{ Quickblox, createSession, currentUser, isLoading, dialogs }}
    >
      {children}
    </QBContext.Provider>
  );
};

export default function useQuickblox() {
  const qbContext = React.useContext(QBContext);
  if (!qbContext)
    throw new Error(
      `useQuickblox can only be used inside the <QuickbloxProvider />`,
    );

  return qbContext;
}
