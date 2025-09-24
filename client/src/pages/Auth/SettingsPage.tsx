import { useState, useEffect } from "react";
import Modal from "../../components/Modal";

export default function SettingsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });
  const [formData, setFormData] = useState({
    investmentPreferences: {
      durationInMonths: "",
      frequency: "",
      investmentAmount: "",
      riskLevel: "",
      investmentGoals: "",
      preferredSectors: "",
      horizon: "",
    },
    assetPreferences: {
      selectedCryptos: [] as string[],
      preferredFiatCurrencies: "",
      diversificationPreference: "",
    },
    signalPreferences: {
      useCompanySignals: false,
      personalSignals: "",
    },
    notificationPreferences: {
      emailNotifications: true,
      smsNotifications: false,
    },
  });


  const handleCryptoChange = (value: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.assetPreferences.selectedCryptos.includes(value);
      const updated = alreadySelected
        ? prev.assetPreferences.selectedCryptos.filter((c) => c !== value)
        : [...prev.assetPreferences.selectedCryptos, value].slice(0, 10);

      return {
        ...prev,
        assetPreferences: {
          ...prev.assetPreferences,
          selectedCryptos: updated,
        },
      };
    });
  };


    const token = localStorage.getItem("token");

    const handleSubmit = async () => {
      const res = await fetch("https://fintech-dashboard-p1y7.onrender.com/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setModalContent({ title: "Success", message: "Settings saved successfully!" });
        setModalOpen(true);
      } else {
        setModalContent({ title: "Error", message: "Failed to save settings." });
        setModalOpen(true);
      }
    };


    useEffect(() => {
      const fetchSettings = async () => {
        try {
          const res = await fetch("https://fintech-dashboard-p1y7.onrender.com/api/settings", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const json = await res.json();
          const data = json.settings;  

          setFormData({
            investmentPreferences: {
              durationInMonths: data.investmentPreferences?.durationInMonths || "",
              frequency: data.investmentPreferences?.frequency || "",
              investmentAmount: data.investmentPreferences?.investmentAmount || "",
              riskLevel: data.investmentPreferences?.riskLevel || "",
              investmentGoals: data.investmentPreferences?.investmentGoals || "",
              preferredSectors: data.investmentPreferences?.preferredSectors || "",
              horizon: data.investmentPreferences?.horizon || "",
            },
            assetPreferences: {
              selectedCryptos: data.assetPreferences?.selectedCryptos || [],
              preferredFiatCurrencies: data.assetPreferences?.preferredFiatCurrencies || "",
              diversificationPreference: data.assetPreferences?.diversificationPreference || "",
            },
            signalPreferences: {
              useCompanySignals: data.signalPreferences?.useCompanySignals || false,
              personalSignals: data.signalPreferences?.personalSignals || "",
            },
            notificationPreferences: {
              emailNotifications: data.notificationPreferences?.emailNotifications ?? true,
              smsNotifications: data.notificationPreferences?.smsNotifications ?? false,
            },
          });
        } catch (err) {
          console.error("Failed to load settings:", err);
        }
      };

      fetchSettings();
    }, []);





  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="pagetitle mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Account Settings
        </h1>
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
              Settings & Preferences
            </li>
          </ol>
        </nav>
      </div>

      {/* Investment Preferences */}
      <div className="bg-white dark:bg-gray-900 dark:text-gray-300 shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold">Investment Preferences</h2>

        <input
          type="number"
          placeholder="Duration in months"
          name="duration_in_months"
          className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
          value={formData.investmentPreferences.durationInMonths}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              investmentPreferences: {
                ...prev.investmentPreferences,
                durationInMonths: e.target.value,
              },
            }))
          }
        />

        <select
          name="frequency"
          className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
          value={formData.investmentPreferences.frequency}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              investmentPreferences: {
                ...prev.investmentPreferences,
                frequency: e.target.value,
              },
            }))
          }
        >
          <option value="">Select Frequency</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>


        <input
          type="number"
          placeholder="Investment Amount ($)"
          name="investment_amount"
          className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
          value={formData.investmentPreferences.investmentAmount}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              investmentPreferences: {
                ...prev.investmentPreferences,
                investmentAmount: e.target.value,
              },
            }))
          }
        />


        <select
          name="risk_level"
          className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
          value={formData.investmentPreferences.riskLevel}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              investmentPreferences: {
                ...prev.investmentPreferences,
                riskLevel: e.target.value,
              },
            }))
          }
        >
          <option value="">Select Risk Level</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>


        <textarea
          placeholder="Describe your investment goals..."
          name="investment_goals"
          className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
          value={formData.investmentPreferences.investmentGoals}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              investmentPreferences: {
                ...prev.investmentPreferences,
                investmentGoals: e.target.value,
              },
            }))
          }
        />


        <input
          type="text"
          placeholder="Preferred Sectors (e.g. Technology, Healthcare)"
          name="preferred_sectors"
          className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
          value={formData.investmentPreferences.preferredSectors}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              investmentPreferences: {
                ...prev.investmentPreferences,
                preferredSectors: e.target.value,
              },
            }))
          }
        />


        <select
          name="horizon"
          className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
          value={formData.investmentPreferences.horizon}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              investmentPreferences: {
                ...prev.investmentPreferences,
                horizon: e.target.value,
              },
            }))
          }
        >
          <option value="">Select Horizon</option>
          <option value="short">Short-term</option>
          <option value="medium">Medium-term</option>
          <option value="long">Long-term</option>
        </select>

      </div>

      {/* Asset Preferences */}
      <div className="bg-white dark:bg-gray-900 dark:text-gray-300 shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold">Asset Preferences</h2>

        <div>
          <p className="mb-2 text-sm font-medium">Select up to 10 Cryptocurrencies</p>
          <div className="grid grid-cols-2 gap-2">
            {["BTC", "ETH", "BNB", "USDT", "ADA", "SOL", "XRP", "DOT", "LTC", "UNI"].map((crypto) => (
              <label key={crypto} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.assetPreferences.selectedCryptos.includes(crypto)}
                  onChange={() => handleCryptoChange(crypto)}
                  disabled={
                    !formData.assetPreferences.selectedCryptos.includes(crypto) &&
                    formData.assetPreferences.selectedCryptos.length >= 10
                  }
                  className="h-4 w-4"
                />
                <span>{crypto}</span>
              </label>
            ))}
          </div>
        </div>

        <input
          type="text"
          placeholder="Preferred Fiat Currencies (USD, EUR, etc.)"
          name="preferred_fiat_currencies"
          className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
          value={formData.assetPreferences.preferredFiatCurrencies}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              assetPreferences: {
                ...prev.assetPreferences,
                preferredFiatCurrencies: e.target.value,
              },
            }))
          }
        />


        <select
          name="diversification_preference"
          className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
          value={formData.assetPreferences.diversificationPreference}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              assetPreferences: {
                ...prev.assetPreferences,
                diversificationPreference: e.target.value,
              },
            }))
          }
        >
          <option value="">Diversification Preference</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

      </div>

      {/* Signal Preferences */}
      <div className="bg-white dark:bg-gray-900 dark:text-gray-300 shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold">Signal Preferences</h2>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.signalPreferences.useCompanySignals}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                signalPreferences: {
                  ...prev.signalPreferences,
                  useCompanySignals: e.target.checked,
                },
              }))
            }
            className="h-4 w-4"
          />
          <span>Use Company Signals</span>
        </label>

        <textarea
          placeholder="Enter your signals..."
          disabled={formData.signalPreferences.useCompanySignals}
          name="personal_signals"
          className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white disabled:opacity-50"
          value={formData.signalPreferences.personalSignals}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              signalPreferences: {
                ...prev.signalPreferences,
                personalSignals: e.target.value,
              },
            }))
          }
        />

      </div>

      {/* Notification Preferences */}
      <div className="bg-white dark:bg-gray-900 dark:text-gray-300 shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold">Notification Preferences</h2>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="email_notifications"
            checked={formData.notificationPreferences.emailNotifications}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                notificationPreferences: {
                  ...prev.notificationPreferences,
                  emailNotifications: e.target.checked,
                },
              }))
            }
            className="h-4 w-4"
          />
          <span>Email Notifications</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="sms_notifications"
            checked={formData.notificationPreferences.smsNotifications}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                notificationPreferences: {
                  ...prev.notificationPreferences,
                  smsNotifications: e.target.checked,
                },
              }))
            }
            className="h-4 w-4"
        />
          <span>SMS Notifications</span>
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Save Settings
      </button>

      <Modal
        open={modalOpen}
        title={modalContent.title}
        message={modalContent.message}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
