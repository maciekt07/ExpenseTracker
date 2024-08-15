import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import {
  removeProfilePicture,
  reset,
  updateUser,
  uploadProfilePicture,
} from "../features/auth/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateSettings } from "../features/settings/settingsSlice";
import { Settings } from "../types/types";

function UserProfile() {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch<AppDispatch>();
  const { settings } = useSelector((state: RootState) => state.settings);
  const [name, setName] = useState(user?.name || "");
  const [selectedCurrency, setSelectedCurrency] = useState<Settings["currency"]>(
    settings.currency || "USD",
  );

  const n = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUser({ name }));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("User updated successfully!");
      dispatch(reset());
    }
    if (isError) {
      toast.error(`Error: ${message}`);
    }

    if (!user) {
      n("/login");
    }
  }, [isSuccess, isError, message, user, n, dispatch]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"];
      if (!allowedFileTypes.includes(file.type)) {
        toast.error("Invalid file type.");
        return;
      }
      dispatch(uploadProfilePicture(file));
    }
  };

  const onRemoveProfilePicture = () => {
    dispatch(removeProfilePicture());
  };

  //@ts-expect-error it works :)
  const currencies: Settings["currency"][] = Intl.supportedValuesOf("currency");

  const displayNames = new Intl.DisplayNames([navigator.language], {
    type: "currency",
  });

  const onCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value;
    setSelectedCurrency(newCurrency);
    dispatch(
      updateSettings({
        ...settings,
        currency: newCurrency,
      }),
    );
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full bg-base-200 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
        {user?.profilePicture ? (
          <div className="avatar flex items-center justify-center mb-6">
            <div className="w-24 rounded-full ring ring-base-200 ring-offset-base-100">
              <img
                src={`/${user.profilePicture}?${user.token}`} // Add token to refresh the image
                alt="Profile"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center mb-6">
            <div className="size-24 text-5xl bg-base-300 font-medium flex items-center justify-center rounded-full ring-4 ring-base-200 ring-offset-base-100 ">
              {user?.name ? user.name[0] : "?"}
            </div>
          </div>
        )}
        <label className="block text-sm font-medium mb-1">Upload profile picture</label>
        <input
          type="file"
          onChange={onFileChange}
          className="file-input w-full mb-4"
          accept="image/*"
        />
        <button onClick={onRemoveProfilePicture} className="btn btn-outline btn-error w-full mb-2">
          Remove Profile Picture
        </button>

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
        <div>
          <h3 className="text-xl font-semibold mb-4">Choose your currency</h3>
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium mb-1">Currency</label>
            <select
              className="select select-bordered w-full"
              value={selectedCurrency}
              onChange={onCurrencyChange}
            >
              {/* TODO: sort currencies by name not by code */}
              {currencies.sort().map((currency: Settings["currency"]) => {
                const displayName = displayNames.of(currency);
                return (
                  <option key={currency} value={currency}>
                    {currency} {displayName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
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
          {name !== user?.name && name.length > 2 && (
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading || name === user?.name || name.length < 3}
            >
              {isLoading ? "Updating..." : "Update Your Profile"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
