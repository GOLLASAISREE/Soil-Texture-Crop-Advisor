import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sprout, Target, TrendingUp, Shield } from "lucide-react";

interface HomepageProps {
  onStartAnalysis: () => void;
}

export function Homepage({ onStartAnalysis }: HomepageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl mb-6 text-gray-900 max-w-4xl mx-auto">
            Get Crop Advice Based on Your Soil Type
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Use our AI-powered tool to analyze your soil conditions and receive personalized crop recommendations 
            that maximize yield, profitability, and sustainability for your land.
          </p>
          <Button 
            size="lg"
            onClick={onStartAnalysis}
            className="px-8 py-4 bg-green-600 hover:bg-green-700"
          >
            Start Soil Analysis Now
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center p-6">
            <CardContent className="pt-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="mb-2">Precision Matching</h3>
              <p className="text-gray-600">
                Match crops perfectly to your soil's texture, pH, and nutrient profile
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="pt-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mb-2">Yield Optimization</h3>
              <p className="text-gray-600">
                Get yield estimates and profitability forecasts for each recommended crop
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="pt-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="mb-2">Sustainability Focus</h3>
              <p className="text-gray-600">
                Recommendations prioritize long-term soil health and environmental impact
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="pt-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="mb-2">Expert Guidance</h3>
              <p className="text-gray-600">
                Receive soil health tips and growing advice from agricultural experts
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50 rounded-lg mx-4">
        <h2 className="text-center mb-12 text-gray-900">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
              1
            </div>
            <h3 className="mb-2">Input Soil Data</h3>
            <p className="text-gray-600">
              Enter your soil texture, pH level, moisture content, and nutrient availability
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
              2
            </div>
            <h3 className="mb-2">AI Analysis</h3>
            <p className="text-gray-600">
              Our algorithm analyzes your data against crop requirements and regional conditions
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
              3
            </div>
            <h3 className="mb-2">Get Recommendations</h3>
            <p className="text-gray-600">
              Receive personalized crop suggestions with yield estimates and growing tips
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}