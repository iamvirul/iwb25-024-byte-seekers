import { Hourglass } from "react-loader-spinner";
import { useAuth } from "../contexts/AuthContext";

const LoadingOverlay = () => {
  const { loading } = useAuth();

  if (!loading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#306cce", "#72a1ed"]}
      />
    </div>
  );
};

export default LoadingOverlay;
