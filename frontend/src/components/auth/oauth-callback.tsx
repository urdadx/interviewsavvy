import { useEffect } from "react";

export const OAuthCallback = () => {
  useEffect(() => {
    if (
      window.opener &&
      (window.opener.location.pathname === "/login" ||
        window.opener.location.pathname === "/register")
    ) {
      window.opener.location.replace("/problems/1");
    } else {
      window.location.replace("/problems/1");
    }

    if (window.opener) {
      window.close();
    }
  });

  return (
    <div className="w-full h-screen flex items-center justify-center">
      Loading ...
    </div>
  );
};
