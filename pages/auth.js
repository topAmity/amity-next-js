

import AmityClient,{ConnectionStatus,ApiEndpoint} from '@amityco/js-sdk'


 function AuthProvider({children,onConnected}) {

    const apiKey = '' // Add your api key here
    function login(){
            const client = new AmityClient({ apiKey:apiKey, apiEndpoint: ApiEndpoint.SG }) // modify your server region here e.g ApiEndpoint.EU
            client.registerSession({ userId: 'johnwick2', displayName: 'johnwick2' }) // Add your own userId and displayName
            client.on("connectionStatusChanged", ({ newValue }) => {
                if (newValue === ConnectionStatus.Connected) {
                    console.log("connected to asc")
                   onConnected && onConnected(true)
              
                }
                else {
                    console.log(" not connected to asc")
                    onConnected && onConnected(false)
                }
            });
            console.log('client: ', client);
        
    }

    

  return (
    <div>
        <button onClick={login}> Login</button>
        {children}
    </div>
  );
}


  export default AuthProvider