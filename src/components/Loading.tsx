import { useEffect, useState } from "react";

function Loading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      Loading....
    </div>
  );
}

export default Loading;
