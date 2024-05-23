import * as Ably from "ably";

import { AblyProvider } from "ably/react";

// @ts-expect-error
const client = Ably.Realtime.Promise({
  authUrl: process.env.NEXT_PUBLIC_ABLY_API_SEC,
});


const AblyProviderComponent = ({ children }: { children: React.ReactNode }) => {
  return <AblyProvider client={client}>{children}</AblyProvider>;
};

export default AblyProviderComponent
