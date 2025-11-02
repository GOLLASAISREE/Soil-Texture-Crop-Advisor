import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { ArrowLeft, HelpCircle } from "lucide-react";

interface FAQPageProps {
  onBack: () => void;
}

export function FAQPage({ onBack }: FAQPageProps) {
  const faqs = [
    {
      id: "accuracy",
      question: "How accurate are these crop recommendations?",
      answer: "Our AI-powered recommendations are based on extensive agricultural research and data from successful farms worldwide. However, local conditions, climate variations, and market factors should also be considered. We recommend using these suggestions as a starting point and consulting with local agricultural experts for final decisions."
    },
    {
      id: "soil-testing",
      question: "Do I need a professional soil test?",
      answer: "While our tool provides valuable insights based on basic soil information, a professional soil test will give you precise nutrient levels, pH measurements, and other detailed characteristics. For best results, combine our recommendations with professional soil analysis, especially for commercial farming operations."
    },
    {
      id: "climate-factors",
      question: "How does climate affect crop recommendations?",
      answer: "Climate is crucial for crop success. Our recommendations consider your regional climate, but local microclimates, seasonal weather patterns, and climate change effects should be evaluated. Monitor local weather forecasts and historical climate data when planning your crops."
    },
    {
      id: "crop-rotation",
      question: "Should I rotate crops each season?",
      answer: "Yes, crop rotation is essential for maintaining soil health, preventing pest buildup, and optimizing nutrient use. Different crops have varying nutrient needs and pest susceptibilities. Plan a 3-4 year rotation cycle including legumes to naturally fix nitrogen in the soil."
    },
    {
      id: "organic-farming",
      question: "Are these recommendations suitable for organic farming?",
      answer: "Our recommendations work for both conventional and organic farming. For organic operations, focus on natural soil amendments, biological pest control, and certified organic seeds. The crop suitability remains the same, but growing methods will differ."
    },
    {
      id: "small-scale",
      question: "Are these recommendations suitable for small-scale or home gardening?",
      answer: "Absolutely! Our recommendations work for any scale, from backyard gardens to commercial farms. For smaller areas, you can often improve soil conditions more easily and try multiple crops to see what works best in your specific location."
    },
    {
      id: "water-management",
      question: "How important is water management?",
      answer: "Water management is critical for crop success. Consider installing efficient irrigation systems, mulching to retain moisture, and choosing crops that match your water availability. Drought-resistant varieties are excellent for areas with limited water access."
    },
    {
      id: "market-prices",
      question: "How do I know if a crop will be profitable?",
      answer: "Research local market prices, demand trends, and production costs. Consider factors like storage requirements, transportation, and processing needs. Start with smaller plots to test market response before scaling up production."
    },
    {
      id: "pest-management",
      question: "How do I handle pests and diseases?",
      answer: "Implement integrated pest management (IPM) strategies: monitor regularly, use biological controls, maintain crop diversity, and apply targeted treatments only when necessary. Healthy soil and proper plant nutrition help crops resist diseases naturally."
    },
    {
      id: "fertilization",
      question: "What about fertilization and soil amendments?",
      answer: "Base fertilization on soil test results and crop requirements. Use organic matter like compost to improve soil structure. Apply fertilizers in split applications during the growing season rather than all at once. Consider slow-release fertilizers for sustained nutrition."
    }
  ];

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
            <span>Back</span>
          </Button>
          <h1 className="text-gray-900 mb-2 flex items-center space-x-2">
            <HelpCircle className="w-6 h-6 text-green-600" />
            <span>Frequently Asked Questions</span>
          </h1>
          <p className="text-gray-600">
            Common questions about soil analysis and crop recommendations.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left hover:text-green-600">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="pt-6">
            <h3 className="mb-4 text-gray-900">Still have questions?</h3>
            <p className="text-gray-600 mb-4">
              If you couldn't find the answer you're looking for, we're here to help.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start">
                Contact Support Team
              </Button>
              <Button variant="outline" className="justify-start">
                Schedule Expert Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}