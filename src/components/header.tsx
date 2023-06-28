import React from "react";
import logo from "../assets/logo.jpg";

type HeaderProps = {
  connectionStatus: boolean;
  lastTimeReceivedData: string;
};

const Header = (props: HeaderProps) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white text-gray-800">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10" />
      </div>
      <div className="table-cell text-left">
        <p
          className={props.connectionStatus ? "text-green-500" : "text-red-500"}
        >
          Connection: {props.connectionStatus ? "ON" : "OFF"}
        </p>
        <p className="text-slate-500">
          Last time recieved data:{" "}
          {props.lastTimeReceivedData
            ? props.lastTimeReceivedData
            : "never recieved"}
        </p>
      </div>
    </header>
  );
};

export default Header;
