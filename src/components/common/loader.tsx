interface Props {
  size?: "small" | "medium" | "large" | "xlarge";
}

const Spinner = (props: Props) => {
  let squareSize: number = 50; // by default medium
  switch (props.size) {
    case "small":
	squareSize = 40;
      break;
    case "medium":
	squareSize = 50;
      break;
    case "large":
	squareSize = 60;
      break;
    case "xlarge":
	squareSize = 70;
      break;
  }

  return (
  <svg className={`animate-spin mt-0.5 mr-3`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4335 4335" width={squareSize} height={squareSize}>
    <path fill="#008DD2" d="M3346 1077c41,0 75,34 75,75 0,41 -34,75 -75,75 -41,0 -75,-34 -75,-75 0,-41 34,-75 75,-75zm-1198 -824c193,0 349,156 349,349 0,193 -156,349 -349,349 -193,0 -349,-156 -349,-349 0,-193 156,-349 349,-349zm-1116 546c151,0 274,123 274,274 0,151 -123,274 -274,274 -151,0 -274,-123 -274,-274 0,-151 123,-274 274,-274zm-500 1189c134,0 243,109 243,243 0,134 -109,243 -243,243 -134,0 -243,-109 -243,-243 0,-134 109,-243 243,-243zm500 1223c121,0 218,98 218,218 0,121 -98,218 -218,218 -121,0 -218,-98 -218,-218 0,-121 98,-218 218,-218zm1116 434c110,0 200,89 200,200 0,110 -89,200 -200,200 -110,0 -200,-89 -200,-200 0,-110 89,-200 200,-200zm1145 -434c81,0 147,66 147,147 0,81 -66,147 -147,147 -81,0 -147,-66 -147,-147 0,-81 66,-147 147,-147zm459 -1098c65,0 119,53 119,119 0,65 -53,119 -119,119 -65,0 -119,-53 -119,-119 0,-65 53,-119 119,-119z"
    />
  </svg>
      );
  };

  const Loader = () => {
	return(
 	<div className="absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-gray-300 z-50 h-screen">
		<Spinner></Spinner> <br />
		<p className="text-blue-950 font-semibold text-lg">Loading...</p>
	</div>
	)
  }

  export default Loader;
