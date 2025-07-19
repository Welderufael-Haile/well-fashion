"use client";

import { useSession } from "next-auth/react";

const userprofile = () => {
  const { data: session } = useSession(); // Get session data
  return (
    <div>
      <h1>user profile</h1>
      {session ? (
        <>
          <span className="text-white">
            {session.user?.name} ({session.user?.email})
          </span>
        </>
      ) : (
        <span className="text-white">Not logged in</span>
      )}
    </div>
  );
}

export default userprofile