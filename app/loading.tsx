import { BallTriangle } from "react-loader-spinner";
export default function Loader() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <BallTriangle
        height={80}
        width={80}
      color="#4fa94d"
        ariaLabel="loading"
      visible={true}
    />
    </div>
  );
}
