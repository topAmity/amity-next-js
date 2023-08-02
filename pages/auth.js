import AmityClient, { ConnectionStatus, ApiEndpoint } from "@amityco/js-sdk";
let client;
function AuthProvider({ children, onConnected }) {
  const apiKey = "b3babb0b3a89f4341d31dc1a01091edcd70f8de7b23d697f"; // Add your api key here

  function login() {
    client = new AmityClient({
      apiKey: apiKey,
      apiEndpoint: ApiEndpoint.SG,
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
    client.on("connectionStatusChanged", ({ newValue }) => {
      if (newValue === ConnectionStatus.Connected) {
        console.log("connected to asc");
        onConnected && onConnected(true);
      } else {
        console.log(" not connected to asc");
        onConnected && onConnected(false);
      }
    });
    // client.unregisterSession();
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
