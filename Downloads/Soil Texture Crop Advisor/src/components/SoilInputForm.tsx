import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Alert, AlertDescription } from "./ui/alert";
import { ArrowLeft, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface SoilData {
  texture: string;
  pH: number[];
  moistureLevel: string;
  nutrients: string[];
  waterAvailability: string;
  region: string;
}

interface SoilInputFormProps {
  onBack: () => void;
  onSubmit: (data: SoilData) => void;
}

export function SoilInputForm({ onBack, onSubmit }: SoilInputFormProps) {
  const [formData, setFormData] = useState<SoilData>({
    texture: '',
    pH: [7],
    moistureLevel: '',
    nutrients: [],
    waterAvailability: '',
    region: ''
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = () => {
    const newErrors: string[] = [];
    
    if (!formData.texture) newErrors.push('Please select soil texture');
    if (!formData.moistureLevel) newErrors.push('Please select moisture level');
    if (!formData.waterAvailability) newErrors.push('Please select water availability');
    if (!formData.region) newErrors.push('Please select your region');

    setErrors(newErrors);

    if (newErrors.length === 0) {
      onSubmit(formData);
    }
  };

  const handleNutrientChange = (nutrient: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      nutrients: checked 
        ? [...prev.nutrients, nutrient]
        : prev.nutrients.filter(n => n !== nutrient)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center space-x-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
          <h1 className="text-gray-900 mb-2">Soil Analysis Input</h1>
          <p className="text-gray-600">
            Please provide details about your soil conditions to get personalized crop recommendations.
          </p>
        </div>

        {errors.length > 0 && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription>
              Please complete the following required fields:
              <ul className="list-disc list-inside mt-2">
                {errors.map(error => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Soil Properties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Soil Texture */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="texture">Soil Texture *</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>The physical composition of your soil (sand, silt, clay ratio)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select value={formData.texture} onValueChange={(value) => setFormData(prev => ({ ...prev, texture: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your soil texture" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sandy">Sandy - Well-draining, low water retention</SelectItem>
                  <SelectItem value="loamy">Loamy - Balanced mixture, ideal for most crops</SelectItem>
                  <SelectItem value="clay">Clay - High water retention, may drain slowly</SelectItem>
                  <SelectItem value="silt">Silt - Fine particles, moderate drainage</SelectItem>
                  <SelectItem value="sandy-loam">Sandy Loam - Good drainage with some retention</SelectItem>
                  <SelectItem value="clay-loam">Clay Loam - Moderate drainage, good nutrients</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* pH Level */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label>Soil pH Level: {formData.pH[0]}</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>pH scale from 4.0 (very acidic) to 10.0 (very alkaline). Most crops prefer 6.0-7.5.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Slider
                value={formData.pH}
                onValueChange={(value) => setFormData(prev => ({ ...prev, pH: value }))}
                max={10}
                min={4}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>4.0 (Acidic)</span>
                <span>7.0 (Neutral)</span>
                <span>10.0 (Alkaline)</span>
              </div>
            </div>

            {/* Moisture Level */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label>Moisture Level *</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Current moisture condition of your soil</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select value={formData.moistureLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, moistureLevel: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select current moisture level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="very-dry">Very Dry - Soil is dusty and cracked</SelectItem>
                  <SelectItem value="dry">Dry - Soil feels dry to touch</SelectItem>
                  <SelectItem value="moderate">Moderate - Slightly moist soil</SelectItem>
                  <SelectItem value="moist">Moist - Soil feels damp</SelectItem>
                  <SelectItem value="wet">Wet - Standing water visible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Water Availability */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label>Water Availability *</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Your access to irrigation and water sources</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select value={formData.waterAvailability} onValueChange={(value) => setFormData(prev => ({ ...prev, waterAvailability: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select water availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abundant">Abundant - Full irrigation system available</SelectItem>
                  <SelectItem value="moderate">Moderate - Limited irrigation available</SelectItem>
                  <SelectItem value="rainfall-dependent">Rainfall Dependent - No irrigation</SelectItem>
                  <SelectItem value="drought-prone">Drought Prone - Very limited water</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Region */}
            <div className="space-y-2">
              <Label>Geographic Region *</Label>
              <Select value={formData.region} onValueChange={(value) => setFormData(prev => ({ ...prev, region: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="temperate">Temperate - Moderate climate</SelectItem>
                  <SelectItem value="tropical">Tropical - Hot and humid</SelectItem>
                  <SelectItem value="arid">Arid - Hot and dry</SelectItem>
                  <SelectItem value="mediterranean">Mediterranean - Dry summers, wet winters</SelectItem>
                  <SelectItem value="continental">Continental - Cold winters, warm summers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Nutrient Content */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Label>Known Nutrient Deficiencies (Optional)</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select any known nutrient deficiencies in your soil</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'nitrogen', label: 'Nitrogen (N)' },
                  { id: 'phosphorus', label: 'Phosphorus (P)' },
                  { id: 'potassium', label: 'Potassium (K)' },
                  { id: 'calcium', label: 'Calcium (Ca)' },
                  { id: 'magnesium', label: 'Magnesium (Mg)' },
                  { id: 'sulfur', label: 'Sulfur (S)' }
                ].map(nutrient => (
                  <div key={nutrient.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={nutrient.id}
                      checked={formData.nutrients.includes(nutrient.id)}
                      onCheckedChange={(checked) => handleNutrientChange(nutrient.id, checked as boolean)}
                    />
                    <Label htmlFor={nutrient.id}>{nutrient.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700">
                Get Crop Recommendations
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}