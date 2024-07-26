import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { updateUser } from "../features/auth/authSlice";
import toast from "react-hot-toast";

function UserProfile() {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );
  const [name, setName] = useState(user?.name || "");
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUser({ name }));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("User updated successfully!");
    }
    if (isError) {
      toast.error(`Error: ${message}`);
    }
  }, [isSuccess, isError, message]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full bg-base-200 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
        <table className="w-full table-auto mb-4">
          <tbody>
            <tr className="border-b">
              <td className="py-2 font-medium">Name</td>
              <td className="py-2">{user?.name}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">Email</td>
              <td className="py-2">{user?.email}</td>
            </tr>
          </tbody>
        </table>
        <form onSubmit={onSubmit}>
          <h3 className="text-xl font-semibold mb-4">Update Your Profile</h3>
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium mb-1">New Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Your Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
