import NetInfo from '@react-native-community/netinfo';
import EventEmitter from "react-native-eventemitter";
import CustomEvents from "../models/CustomEvents";

export const checkNetworkInfo = (s) => {
	/*NetInfo.getConnectionInfo();
	NetInfo.isConnected.fetch().done(
		(isConnected) => { //console.log("isconnected? "+isConnected);
		    return isConnected;
         }
	);*/
	//console.log("checknetworkinfo");
	NetInfo.fetch().then(state => {
		//console.log('Connection type', state.type);
		//console.log('Is connected?', state.isConnected);
		if(!state.isConnected && s) EventEmitter.emit(CustomEvents.NO_CONNECTION, true);
		//EventEmitter.emit(CustomEvents.NO_CONNECTION, true);
	  });
}