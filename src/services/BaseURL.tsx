import { BASE_PROTOCOL, BASE_PATH, HUB_URL, SERVER_IP, SERVER_PORT } from '../config'
import { BaseUrlTypes } from '../types'

/* 
Get base url for API calls hub connection
@return string => the base url
*/
const getBaseURL = (type: BaseUrlTypes): string => {
	const base = `${BASE_PROTOCOL}${SERVER_IP}:${SERVER_PORT}`
	 return type === 'api' ? `${base}${BASE_PATH}` :  `${base}${HUB_URL}`
}

export default getBaseURL;