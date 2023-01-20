import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
const AuthContent = dynamic(() => import("./auth"), {
  ssr: false,
});
const FeedContent = dynamic(() => import("./feed"), {
  ssr: false,
});

export default function Home({ data }) {
  console.log("data: ", data);
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);

  function onConnected(value) {
    setIsConnected(value);
  }
  return (
    <div>
      <AuthContent onConnected={onConnected}>
        <FeedContent isConnected={isConnected} />
      </AuthContent>
    </div>
  );
}
