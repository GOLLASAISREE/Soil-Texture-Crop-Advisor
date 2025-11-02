import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { 
  ArrowLeft, 
  TrendingUp, 
  DollarSign, 
  Leaf, 
  Droplets, 
  Sun,
  AlertTriangle,
  CheckCircle,
  Star
} from "lucide-react";

interface SoilData {
  texture: string;
  pH: number[];
  moistureLevel: string;
  nutrients: string[];
  waterAvailability: string;
  region: string;
}

interface CropRecommendation {
  name: string;
  scientific_name: string;
  suitability_score: number;
  yield_estimate: string;
  profitability: 'High' | 'Medium' | 'Low';
  sustainability_score: number;
  growing_season: string;
  water_requirement: string;
  reasons: string[];
  tips: string[];
  challenges: string[];
}

interface RecommendationsPageProps {
  soilData: SoilData;
  onBack: () => void;
  onHome: () => void;
}

export function RecommendationsPage({ soilData, onBack, onHome }: RecommendationsPageProps) {
  // Mock crop recommendations based on soil data
  const generateRecommendations = (data: SoilData): CropRecommendation[] => {
    const baseRecommendations: CropRecommendation[] = [
      {
        name: "Corn (Maize)",
        scientific_name: "Zea mays",
        suitability_score: 85,
        yield_estimate: "8-12 tons/hectare",
        profitability: "High",
        sustainability_score: 75,
        growing_season: "Spring to Fall",
        water_requirement: "Moderate to High",
        reasons: ["Tolerates wide pH range", "Adapts well to various soil textures", "High market demand"],
        tips: ["Plant after soil temperature reaches 10°C", "Apply nitrogen fertilizer in split applications"],
        challenges: ["Requires consistent water supply", "Susceptible to corn borer"]
      },
      {
        name: "Wheat",
        scientific_name: "Triticum aestivum",
        suitability_score: 78,
        yield_estimate: "4-6 tons/hectare",
        profitability: "Medium",
        sustainability_score: 85,
        growing_season: "Fall to Summer",
        water_requirement: "Low to Moderate",
        reasons: ["Drought tolerant", "Good for crop rotation", "Stable market prices"],
        tips: ["Ensure good drainage", "Monitor for fungal diseases in humid conditions"],
        challenges: ["Price volatility", "Storage requirements"]
      },
      {
        name: "Soybeans",
        scientific_name: "Glycine max",
        suitability_score: 82,
        yield_estimate: "2.5-4 tons/hectare",
        profitability: "High",
        sustainability_score: 90,
        growing_season: "Spring to Fall",
        water_requirement: "Moderate",
        reasons: ["Fixes nitrogen in soil", "High protein content", "Growing export demand"],
        tips: ["Inoculate seeds with rhizobia bacteria", "Rotate with cereals"],
        challenges: ["Sensitive to waterlogged conditions", "Pest management required"]
      }
    ];

    // Adjust scores based on soil conditions
    return baseRecommendations.map(crop => {
      let adjustedScore = crop.suitability_score;
      
      // Adjust for soil texture
      if (data.texture === 'loamy') adjustedScore += 5;
      else if (data.texture === 'clay' && crop.name === 'Wheat') adjustedScore += 3;
      else if (data.texture === 'sandy' && crop.name === 'Corn (Maize)') adjustedScore -= 5;

      // Adjust for pH
      const pH = data.pH[0];
      if (pH >= 6.0 && pH <= 7.5) adjustedScore += 5;
      else if (pH < 5.5 || pH > 8.0) adjustedScore -= 10;

      // Adjust for water availability
      if (data.waterAvailability === 'drought-prone' && crop.water_requirement === 'High') {
        adjustedScore -= 15;
      }

      return { ...crop, suitability_score: Math.max(0, Math.min(100, adjustedScore)) };
    }).sort((a, b) => b.suitability_score - a.suitability_score);
  };

  const recommendations = generateRecommendations(soilData);

  const getSoilHealthTips = (data: SoilData): string[] => {
    const tips = [];
    
    if (data.texture === 'sandy') {
      tips.push("Add organic compost to improve moisture retention and nutrient content");
    } else if (data.texture === 'clay') {
      tips.push("Improve drainage by adding organic matter and avoiding compaction");
    }

    const pH = data.pH[0];
    if (pH < 6.0) {
      tips.push("Consider lime application to raise pH for better nutrient availability");
    } else if (pH > 8.0) {
      tips.push("Add sulfur or organic matter to lower pH gradually");
    }

    if (data.nutrients.length > 0) {
      tips.push(`Address nutrient deficiencies: ${data.nutrients.join(', ')}`);
    }

    return tips;
  };

  const soilHealthTips = getSoilHealthTips(soilData);

  const getProfitabilityColor = (profitability: string) => {
    switch (profitability) {
      case 'High': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Analysis</span>
            </Button>
            <Button variant="outline" onClick={onHome}>
              Start New Analysis
            </Button>
          </div>
          <h1 className="text-gray-900 mb-2">Crop Recommendations</h1>
          <p className="text-gray-600">
            Based on your soil analysis, here are the best crop options for your land.
          </p>
        </div>

        {/* Soil Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Soil Analysis Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Texture:</span>
                <p className="capitalize">{soilData.texture.replace('-', ' ')}</p>
              </div>
              <div>
                <span className="text-gray-500">pH Level:</span>
                <p>{soilData.pH[0].toFixed(1)}</p>
              </div>
              <div>
                <span className="text-gray-500">Moisture:</span>
                <p className="capitalize">{soilData.moistureLevel.replace('-', ' ')}</p>
              </div>
              <div>
                <span className="text-gray-500">Water Access:</span>
                <p className="capitalize">{soilData.waterAvailability.replace('-', ' ')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {recommendations.map((crop, index) => (
            <Card key={crop.name} className="relative">
              {index === 0 && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span>Top Pick</span>
                </div>
              )}
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{crop.name}</CardTitle>
                    <p className="text-sm text-gray-500 italic">{crop.scientific_name}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-semibold text-green-600">
                      {crop.suitability_score}%
                    </div>
                    <div className="text-xs text-gray-500">Match Score</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <div>
                      <div className="text-gray-500">Yield</div>
                      <div>{crop.yield_estimate}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="text-gray-500">Profitability</div>
                      <Badge className={getProfitabilityColor(crop.profitability)}>
                        {crop.profitability}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <div>
                      <div className="text-gray-500">Sustainability</div>
                      <div className="flex items-center space-x-1">
                        <Progress value={crop.sustainability_score} className="w-16 h-2" />
                        <span>{crop.sustainability_score}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="text-gray-500">Water Need</div>
                      <div>{crop.water_requirement}</div>
                    </div>
                  </div>
                </div>

                {/* Growing Season */}
                <div className="flex items-center space-x-2 text-sm">
                  <Sun className="w-4 h-4 text-orange-600" />
                  <div>
                    <span className="text-gray-500">Season: </span>
                    {crop.growing_season}
                  </div>
                </div>

                {/* Why Recommended */}
                <div>
                  <h4 className="text-sm mb-2 flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Why Recommended</span>
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {crop.reasons.slice(0, 2).map(reason => (
                      <li key={reason} className="flex items-start space-x-1">
                        <span className="text-green-600 mt-1">•</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Tips */}
                <div>
                  <h4 className="text-sm mb-2 flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>Growing Tips</span>
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {crop.tips.slice(0, 2).map(tip => (
                      <li key={tip} className="flex items-start space-x-1">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button variant="outline" className="w-full">
                  View Detailed Guide
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Soil Health Tips */}
        {soilHealthTips.length > 0 && (
          <Alert className="mb-6">
            <Leaf className="h-4 w-4" />
            <AlertTitle>Soil Health Recommendations</AlertTitle>
            <AlertDescription>
              <ul className="mt-2 space-y-1">
                {soilHealthTips.map(tip => (
                  <li key={tip} className="flex items-start space-x-1">
                    <span className="text-green-600 mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Additional Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <span>Important Considerations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• These recommendations are based on general soil conditions</li>
                <li>• Conduct a detailed soil test for precise nutrient analysis</li>
                <li>• Consider local climate patterns and market conditions</li>
                <li>• Consult with local agricultural extension services</li>
                <li>• Plan crop rotation to maintain soil health</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Download Detailed Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Find Local Seed Suppliers
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Contact Agricultural Advisor
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={onHome}>
                  Analyze Another Field
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}