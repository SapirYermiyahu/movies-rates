import axios from "axios";
import { BASE_PROTOCOL, BASE_PATH, HUB_URL, BASE_URL_GET_IP } from '../config'
import { BaseUrlTypes } from '../types'

/* 
Get the user current IP
@return IP
*/
const getCurrentIP = async(): Promise<number> => {
		const res = await axios.get(BASE_URL_GET_IP);				
		return res.data.IPv4;
}

/* 
Get base url for API calls hub connection
@return string => the base url
*/
const getBaseURL = async(type: BaseUrlTypes): Promise<string> => {
	const currentIP = await getCurrentIP();
	 return type === 'api' ? `${BASE_PROTOCOL}${currentIP}${BASE_PATH}` :  `${BASE_PROTOCOL}${currentIP}${HUB_URL}`

}

export default getBaseURL;