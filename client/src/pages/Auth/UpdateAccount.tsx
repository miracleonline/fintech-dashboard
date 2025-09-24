// src/pages/Auth/UpdateAccount.tsx
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";

interface AccountInfo {
  wallet_address: string;
  bank_name: string;
  account_number: string;
  address: string;
  city: string;
  country: string;
  zip_code: string;
  profileImage?: string; // URL from backend
}

export default function UpdateAccount() {
  const [form, setForm] = useState<AccountInfo>({
    wallet_address: "",
    bank_name: "",
    account_number: "",
    address: "",
    city: "",
    country: "",
    zip_code: "",
    profileImage: "",
  });

  const [originalForm, setOriginalForm] = useState<AccountInfo | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);


  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  // Fetch current account info when page loads
  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://fintech-dashboard-p1y7.onrender.com/api/account/info", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setForm(data.account);
          setOriginalForm(data.account);
        }
      } catch (err) {
        console.error("Error fetching account info", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Create preview URL
      const preview = URL.createObjectURL(selectedFile);
      setPreviewUrl(preview);
    }
  };


  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);


  const handleCancel = () => {
    if (originalForm) setForm(originalForm);
    setFile(null);
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // Use FormData for file upload
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value as string);
      });
      if (file) formData.append("profile_image", file);

      const res = await fetch("https://fintech-dashboard-p1y7.onrender.com/api/account/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setModalTitle("Error");
        setModalMessage(data.message || "Failed to update account info.");
      } else {
        setModalTitle("Success");
        setModalMessage("Account information updated successfully!");
        setPreviewUrl(null); // clear temporary preview
        setFile(null);       // reset file input
        setIsEditing(false);
        setOriginalForm({ ...form, profileImage: data.profileImage });
        if (data.profileImage) {
          setOriginalForm(data.account);
          setForm(data.account);
        }
      }
      setModalOpen(true);
    } catch (err: any) {
      setModalTitle("Error");
      setModalMessage(err.message || "Network error, please try again.");
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Page Title */}
      <div className="pagetitle mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Account Update</h1>
        <nav className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          <ol className="breadcrumb flex space-x-2">
            <li>
              <a href="/" className="text-blue-600 hover:underline">
                Home
              </a>
            </li>
            <li>/</li>
            <li>Account Settings</li>
            <li>/</li>
            <li className="font-medium text-gray-900 dark:text-white">
              Update Account
            </li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="card bg-white dark:bg-gray-900 shadow rounded-xl">
          <div className="card-body p-6">
            <div className="flex justify-between items-center mb-4">
              <h5 className="card-title text-lg font-semibold text-gray-800 dark:text-gray-200">
                Update your account info
              </h5>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update
                </button>
              )}
            </div>



            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Wallet Address</label>
                <input
                  type="text"
                  name="wallet_address"
                  value={form.wallet_address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Bank Name</label>
                <input
                  type="text"
                  name="bank_name"
                  value={form.bank_name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Account Number</label>
                <input
                  type="text"
                  name="account_number"
                  value={form.account_number}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Address</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white disabled:opacity-60"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">City</label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-gray-300">Country</label>
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white disabled:opacity-60"
                  >
                    <option value="">Select Country</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Zip Code</label>
                <input
                  type="text"
                  name="zip_code"
                  value={form.zip_code}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-300">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={!isEditing}
                  className="w-full text-sm text-gray-700 dark:text-gray-200 disabled:opacity-60"
                />
              </div>

              {/* Profile Image */}
              <div className="mb-4">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Selected Preview"
                    className="w-24 h-24 rounded-full object-cover border"
                  />
                ) : form.profileImage ? (
                  <img
                    src={`http://localhost:5000${form.profileImage}`}
                    alt="Current Profile"
                    className="w-24 h-24 rounded-full object-cover border"
                  />
                ) : null}
              </div>

              {isEditing && (
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:opacity-80"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Modal for success/error */}
      <Modal
        open={modalOpen}
        title={modalTitle}
        message={modalMessage}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
