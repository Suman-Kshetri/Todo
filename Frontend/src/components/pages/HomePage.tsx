import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
    }
  }, [location.state]);

  return <div className="mt-20">Welcome to Home</div>;
}
export default HomePage