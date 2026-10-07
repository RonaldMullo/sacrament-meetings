import { signOut } from "@/auth";

export default function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";

        await signOut({
          redirectTo: "/login",
        });
      }}
    >
      <button
        type="submit"
        className="font-medium text-gray-700 transition-colors hover:text-blue-700"
      >
        Sign Out
      </button>
    </form>
  );
}