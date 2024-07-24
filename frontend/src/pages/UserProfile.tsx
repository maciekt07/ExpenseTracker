import { useSelector } from "react-redux";
import { RootState } from "../app/store";

function UserProfile() {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full bg-white text-gray-700 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
        <table className="w-full table-auto">
          <tbody>
            <tr className="border-b">
              <td className="py-2 font-medium ">Name</td>
              <td className="py-2 text-gray-900">{user?.name}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium ">Email</td>
              <td className="py-2 text-gray-900">{user?.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserProfile;
