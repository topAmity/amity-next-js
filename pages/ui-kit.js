// import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { useState } from "react";

// import { AmityUiKitProvider, AmityUiKitSocial } from "@amityco/ui-kit";
const AmityUiKitProvider = dynamic(
  () => import("@meetperry/amity-uikit").then((mod) => mod.AmityUiKitProvider),
  {
    ssr: false,
  }
);
const AmityUiKitSocial = dynamic(
  () => import("@meetperry/amity-uikit").then((mod) => mod.AmityUiKitSocial),
  {
    ssr: false,
  }
);
import Login from "./login";

const apiKey = "b3babb0b3a89f4341d31dc1a01091edcd70f8de7b23d697f";

export default function UiKit() {
  const [userId, setUserId] = useState();

  return (
    <div className="App">
      {!userId ? (
        <Login onSubmit={setUserId} />
      ) : (
        <AmityUiKitProvider
          key={userId}
          apiKey={apiKey}
          apiEndpoint="https://api.sg.amity.co"
          userId={userId}
          displayName={userId}
        >
          <AmityUiKitSocial />
        </AmityUiKitProvider>
      )}
    </div>
  );
}
