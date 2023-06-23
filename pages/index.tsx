import useQuickblox from "@/providers/quickblox-provider";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  const qb = useQuickblox();
  const router = useRouter();

  // temp data
  const userData = {
    email: "zjesegovia@917ventures.com",
    password: "12345678",
  };

  const startVetChatSession = async () => {
    await qb.createSession(userData);

    router.push("/chat");
  };

  return (
    <>
      <main>
        <h1>Petpal Vet Chat</h1>
        <h2>Dummy User</h2>
        <pre>{JSON.stringify(userData, null, 2)}</pre>
        <button
          type="button"
          onClick={startVetChatSession}
          className="bg-primary text-white px-9 py-3 font-semibold rounded-full shadow-sm"
        >
          {qb.isLoading ? "Loading..." : "Login"}
        </button>
      </main>
    </>
  );
}
