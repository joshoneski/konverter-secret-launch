
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Auth callback error:", error);
          navigate("/");
          return;
        }

        if (data?.session) {
          // Successfully authenticated
          console.log("Authentication successful");
          navigate("/");
        }
      } catch (error) {
        console.error("Auth callback processing error:", error);
        navigate("/");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Processing authentication...</h2>
        <div className="animate-pulse">Please wait</div>
      </div>
    </div>
  );
}
