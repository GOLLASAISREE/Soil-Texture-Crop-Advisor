import { useState } from "react";
import { Header } from "./components/Header";
import { Homepage } from "./components/Homepage";
import { SoilInputForm } from "./components/SoilInputForm";
import { RecommendationsPage } from "./components/RecommendationsPage";
import { FAQPage } from "./components/FAQPage";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";

interface SoilData {
  texture: string;
  pH: number[];
  moistureLevel: string;
  nutrients: string[];
  waterAvailability: string;
  region: string;
}

type Page =
  | "home"
  | "input"
  | "recommendations"
  | "faq"
  | "settings";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [soilData, setSoilData] = useState<SoilData | null>(
    null,
  );
  const [language, setLanguage] = useState("EN");

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleStartAnalysis = () => {
    setCurrentPage("input");
  };

  const handleSoilDataSubmit = (data: SoilData) => {
    setSoilData(data);
    setCurrentPage("recommendations");
    toast.success(
      "Soil analysis complete! Here are your crop recommendations.",
    );
  };

  const handleLanguageChange = () => {
    const newLanguage = language === "EN" ? "ES" : "EN";
    setLanguage(newLanguage);
    toast.info(
      `Language changed to ${newLanguage === "EN" ? "English" : "Spanish"}`,
    );
  };

  const handleBackToInput = () => {
    setCurrentPage("input");
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
    setSoilData(null);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <Homepage onStartAnalysis={handleStartAnalysis} />
        );

      case "input":
        return (
          <SoilInputForm
            onBack={handleBackToHome}
            onSubmit={handleSoilDataSubmit}
          />
        );

      case "recommendations":
        return soilData ? (
          <RecommendationsPage
            soilData={soilData}
            onBack={handleBackToInput}
            onHome={handleBackToHome}
          />
        ) : (
          <Homepage onStartAnalysis={handleStartAnalysis} />
        );

      case "faq":
        return (
          <FAQPage onBack={() => setCurrentPage("home")} />
        );

      case "settings":
        return (
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4">
              <div className="bg-white rounded-lg p-6">
                <h1 className="text-gray-900 mb-4">Settings</h1>
                <p className="text-gray-600 mb-4">
                  Settings panel coming soon...
                </p>
                <button
                  onClick={() => setCurrentPage("home")}
                  className="text-green-600 hover:text-green-700"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <Homepage onStartAnalysis={handleStartAnalysis} />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLanguageChange={handleLanguageChange}
      />

      <main>{renderCurrentPage()}</main>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <h3 className="mb-4">AI Crop Advisor</h3>
              <p className="text-gray-400 text-sm">
                Helping farmers make informed decisions through
                soil analysis and AI-powered crop
                recommendations.
              </p>
            </div>
            <div>
              <h4 className="mb-3">Tools</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button
                    onClick={() => setCurrentPage("input")}
                  >
                    Soil Analysis
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      setCurrentPage("recommendations")
                    }
                  >
                    Crop Recommendations
                  </button>
                </li>
                <li>Yield Calculator</li>
                <li>Growing Calendar</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button onClick={() => setCurrentPage("faq")}>
                    FAQ
                  </button>
                </li>
                <li>Growing Guides</li>
                <li>Expert Articles</li>
                <li>Video Tutorials</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Contact Us</li>
                <li>Help Center</li>
                <li>Community Forum</li>
                <li>Technical Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>
              &copy; 2024 AI Crop Advisor. All rights reserved.
              | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>

      <Toaster position="top-right" />
    </div>
  );
}