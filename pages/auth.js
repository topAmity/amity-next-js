import AmityClient, { ConnectionStatus, ApiEndpoint } from "@amityco/js-sdk";
let client;
function AuthProvider({ children, onConnected }) {
  const apiKey = "b0efec52388fa2664b638b1e525a11898500dfb1bc3c6f2d"; // Add your api key here

  function login() {
    client = new AmityClient({
      apiKey: apiKey,
      apiEndpoint: ApiEndpoint.EU,
    }); // modify your server region here e.g ApiEndpoint.EU
    client.registerSession({
      userId: "top",
      displayName: "top",
    }); // Add your own userId and displayName
    client.on("connectionStatusChanged", ({ newValue }) => {
      if (newValue === ConnectionStatus.Connected) {
        console.log("connected to asc");
        onConnected && onConnected(true);
      } else {
        console.log(" not connected to asc");
        onConnected && onConnected(false);
      }
    });
    console.log("client: ", client);
  }

  function logout(){

    client.unregisterSession();
  }

  return (
    <div>
      <button onClick={login}> Login</button>
      <button onClick={logout}> Logout</button>
      {children}
    </div>
  );
}

export default AuthProvider;
