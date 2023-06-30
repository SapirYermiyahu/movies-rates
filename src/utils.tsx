import { ChartDatatType } from "./types";

export const getDateWithTimeFormat = (date: string) : string => {
	const d = new Date(date);
    const dformat = [d.getMonth()+1,
               d.getDate(),
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');
	return dformat;
}

export const sortArrayByTime = (arr: Array<ChartDatatType>): ChartDatatType[] => {
	return arr.sort((a,b) => Date.parse(a.name) - Date.parse(b.name))
}