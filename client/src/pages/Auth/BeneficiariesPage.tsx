import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";

interface Beneficiary {
  _id: string; // MongoDB id
  fullName: string;
  dateOfBirth: string;
  relationship: string;
  bankName: string;
  accountNumber: string;
}

export default function BeneficiariesPage() {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    relationship: "",
    bankName: "",
    accountNumber: "",
  });
  const [tab, setTab] = useState<"list" | "add">("list");
  const [editId, setEditId] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const token = localStorage.getItem("token");

  // Fetch beneficiaries
  useEffect(() => {
    fetch("https://fintech-dashboard-p1y7.onrender.com/api/beneficiaries", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBeneficiaries(data.beneficiaries || []));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update Beneficiary
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editId
      ? `https://fintech-dashboard-p1y7.onrender.com/api/beneficiaries/${editId}`
      : "https://fintech-dashboard-p1y7.onrender.com/api/beneficiaries";
    const method = editId ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const data = await res.json();
      if (editId) {
        setBeneficiaries((prev) =>
          prev.map((b) => (b._id === editId ? data.beneficiary : b))
        );
        setModalMessage("Beneficiary updated successfully!");
      } else {
        setBeneficiaries([...beneficiaries, data.beneficiary]);
        setModalMessage("Beneficiary added successfully!");
      }
      setModalOpen(true);
      setForm({
        fullName: "",
        dateOfBirth: "",
        relationship: "",
        bankName: "",
        accountNumber: "",
      });
      setEditId(null);
      setTab("list");
    }
  };

  // Edit beneficiary
  const handleEdit = (b: Beneficiary) => {
    setForm({
      fullName: b.fullName,
      dateOfBirth: b.dateOfBirth,
      relationship: b.relationship,
      bankName: b.bankName,
      accountNumber: b.accountNumber,
    });
    setEditId(b._id);
    setTab("add");
  };

  // Delete beneficiary
  const handleDelete = async (id: string) => {
    const res = await fetch(
      `https://fintech-dashboard-p1y7.onrender.com/api/beneficiaries/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (res.ok) {
      setBeneficiaries((prev) => prev.filter((b) => b._id !== id));
      setModalMessage("Beneficiary deleted successfully!");
      setModalOpen(true);
    }
  };

  return (
    <div>
      {/* Page Title */}
      <div className="pagetitle mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Account Beneficiaries
        </h1>

        <nav className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          <ol className="breadcrumb flex space-x-2">
            <li>
              <a href="/" className="text-blue-600 hover:underline">Home</a>
            </li>
            <li>/</li>
            <li>Account Settings</li>
            <li>/</li>
            <li className="font-medium text-gray-900 dark:text-white">Signatories & Beneficiaries</li>
          </ol>
        </nav>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-6">
        <button
          className={`px-4 py-2 ${
            tab === "list"
              ? "border-b-2 border-blue-600 font-semibold text-gray-800 dark:text-white"
              : "text-gray-500"
          }`}
          onClick={() => {
            setTab("list");
            setEditId(null);
            setForm({
              fullName: "",
              dateOfBirth: "",
              relationship: "",
              bankName: "",
              accountNumber: "",
            });
          }}
        >
          Beneficiaries
        </button>
        <button
          className={`px-4 py-2 ${
            tab === "add"
              ? "border-b-2 border-blue-600 font-semibold text-gray-800 dark:text-white"
              : "text-gray-500"
          }`}
          onClick={() => setTab("add")}
        >
          {editId ? "Edit Beneficiary" : "Add Beneficiary"}
        </button>
      </div>

      {/* Beneficiaries List */}
      {tab === "list" && (
        <div className="bg-white shadow rounded-lg p-6 dark:bg-gray-900">
          {beneficiaries.length === 0 ? (
            <p className="text-gray-500">No beneficiaries added yet.</p>
          ) : (
          <div className="overflow-x-auto max-w-full">
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Full Name</th>
                  <th className="p-2">Date of Birth</th>
                  <th className="p-2">Relationship</th>
                  <th className="p-2">Bank</th>
                  <th className="p-2">Account Number</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {beneficiaries.map((b) => (
                  <tr
                    key={b._id}
                    className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700"
                  >
                    <td className="p-2 dark:text-white">{b.fullName}</td>
                    <td className="p-2 dark:text-white">{b.dateOfBirth}</td>
                    <td className="p-2 dark:text-white">{b.relationship}</td>
                    <td className="p-2 dark:text-white">{b.bankName}</td>
                    <td className="p-2 dark:text-white">{b.accountNumber}</td>
                    <td className="p-2 space-x-2">
                      <button 
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        onClick={() => handleEdit(b)}
                      >
                        Edit
                      </button>
                      <button 
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={() => handleDelete(b._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </div>
      )}

      {/* Add/Edit Beneficiary Form */}
      {tab === "add" && (
        <div className="bg-white shadow rounded-lg p-6 dark:bg-gray-900">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Legal Name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
              required
            />
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
              required
            />
            <input
              type="text"
              name="relationship"
              placeholder="Relationship"
              value={form.relationship}
              onChange={handleChange}
              className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
              required
            />
            <input
              type="text"
              name="bankName"
              placeholder="Bank Name"
              value={form.bankName}
              onChange={handleChange}
              className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
              required
            />
            <input
              type="text"
              name="accountNumber"
              placeholder="Account Number"
              value={form.accountNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              {editId ? "Update Beneficiary" : "Add Beneficiary"}
            </button>
          </form>
        </div>
      )}
      
      {/* Success Modal */}
      <Modal
        open={modalOpen}
        title="Success"
        message={modalMessage}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
