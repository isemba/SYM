import NetInfo from '@react-native-community/netinfo';

export const checkNetworkInfo = () => {
	/*NetInfo.getConnectionInfo();
	NetInfo.isConnected.fetch().done(
		(isConnected) => { console.log("isconnected? "+isConnected);
		    return isConnected;
         }
	);*/
	NetInfo.fetch().then(state => {
		console.log('Connection type', state.type);
		console.log('Is connected?', state.isConnected);
	  });
}