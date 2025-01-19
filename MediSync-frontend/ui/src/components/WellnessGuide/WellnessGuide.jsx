import React from 'react';
import { Collapse, Typography } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './WellnessGuide.scss';

const { Panel } = Collapse;
const { Text } = Typography;

export const diseases = [
  {
    name: "Dengue Fever",
    premedication: [
      "No specific antiviral medication for dengue; focus on symptom relief."
    ],
    treatmentPlan: [
      "Paracetamol (to manage fever and pain; avoid NSAIDs like aspirin or ibuprofen as they increase bleeding risk).",
      "Stay hydrated (IV fluids if needed for severe cases).",
      "Monitor for warning signs of dengue hemorrhagic fever."
    ],
    dietPlan: [
      "Papaya leaves juice (may improve platelet count).",
      "Hydration with water, ORS, and coconut water.",
      "Foods rich in vitamins and antioxidants (kiwi, oranges)."
    ],
    notToEat: [
      "Oily, fried, and spicy foods (hard on the stomach).",
      "Caffeine (can worsen dehydration)."
    ]
  },
  {
    name: "Malaria",
    premedication: [
      "Chloroquine (for chloroquine-sensitive strains).",
      "Artemisinin-based combination therapies (ACTs) for resistant strains."
    ],
    treatmentPlan: [
      "Antimalarial drugs as prescribed.",
      "Regular blood tests to monitor parasitic load."
    ],
    dietPlan: [
      "High-calorie foods (bananas, rice, potatoes) for energy.",
      "Iron-rich foods (spinach, red meat) to combat anemia caused by malaria."
    ],
    notToEat: [
      "Alcohol (can strain the liver, already affected by malaria).",
      "Heavy, greasy foods (difficult to digest)."
    ]
  },
  {
    name: "Diarrhea",
    premedication: [
      "ORS (Oral Rehydration Salts) to prevent dehydration.",
      "Zinc supplements (reduces severity and duration).",
      "Loperamide (only if diarrhea is non-infectious and persistent)."
    ],
    treatmentPlan: [
      "Stay hydrated with water, ORS, or clear broths.",
      "Identify and treat the cause (e.g., bacterial infections may require antibiotics)."
    ],
    dietPlan: [
      "BRAT diet (Bananas, Rice, Applesauce, Toast).",
      "Light soups and probiotics (yogurt)."
    ],
    notToEat: [
      "Dairy products (except yogurt; may worsen symptoms).",
      "High-fiber and greasy foods."
    ]
  },
  {
    name: "Common Cold and Flu",
    premedication: [
      "Antihistamines (e.g., Cetirizine).",
      "Decongestants (e.g., Pseudoephedrine).",
      "Paracetamol/Ibuprofen (for fever and aches)."
    ],
    treatmentPlan: [
      "Rest and hydration.",
      "Steam inhalation to relieve congestion."
    ],
    dietPlan: [
      "Warm soups (chicken soup helps reduce inflammation).",
      "Vitamin C-rich foods (citrus fruits, strawberries).",
      "Ginger and honey (for sore throat relief)."
    ],
    notToEat: [
      "Sugary foods (can suppress immune function).",
      "Dairy if it increases mucus production in some individuals."
    ]
  },
  {
    name: "Typhoid Fever",
    premedication: [
      "Antibiotics (e.g., Ceftriaxone or Ciprofloxacin)."
    ],
    treatmentPlan: [
      "Bed rest and hydration.",
      "Monitor for complications (intestinal perforation)."
    ],
    dietPlan: [
      "Easily digestible foods (porridge, boiled potatoes).",
      "Hydrating fluids (coconut water, soups)."
    ],
    notToEat: [
      "Raw vegetables or unpeeled fruits (risk of contamination).",
      "Spicy and greasy foods (hard on the digestive system)."
    ]
  },
  {
    name: "Cholera",
    premedication: [
      "ORS to replace lost fluids and electrolytes.",
      "Antibiotics like Azithromycin in severe cases."
    ],
    treatmentPlan: [
      "Aggressive rehydration therapy.",
      "Zinc supplements for children."
    ],
    dietPlan: [
      "Soft, easily digestible foods (rice porridge, boiled potatoes).",
      "Fluids with electrolytes (coconut water, ORS)."
    ],
    notToEat: [
      "Raw or undercooked seafood.",
      "Spicy, fried, and high-fiber foods."
    ]
  },
  {
    name: "Tuberculosis (TB)",
    premedication: [
      "First-line TB drugs: Rifampin, Isoniazid, Pyrazinamide, Ethambutol."
    ],
    treatmentPlan: [
      "Strict adherence to a 6-month or longer treatment plan.",
      "Monitor liver function (some drugs are hepatotoxic)."
    ],
    dietPlan: [
      "High-protein foods (eggs, lean meat, legumes).",
      "Foods rich in Vitamin C and E (oranges, almonds)."
    ],
    notToEat: [
      "Alcohol (interferes with medication and strains the liver).",
      "High-fat foods (affects drug absorption)."
    ]
  },
  {
    name: "Jaundice",
    premedication: [
      "No specific medication; treat underlying cause (e.g., antiviral for hepatitis)."
    ],
    treatmentPlan: [
      "Rest and proper hydration.",
      "Monitor liver function tests."
    ],
    dietPlan: [
      "Liver-friendly foods (carrots, beets).",
      "Fluids like sugarcane juice and coconut water."
    ],
    notToEat: [
      "Alcohol and fatty foods.",
      "Processed and fried foods."
    ]
  },
  {
    name: "Chickenpox",
    premedication: [
      "Antihistamines (e.g., Diphenhydramine) for itching.",
      // "Acyclovir (for severe cases, particularly in adults)."
    ],
    treatmentPlan: [
      "Calamine lotion for skin relief.",
      "Rest and hydration."
    ],
    dietPlan: [
      "Soft foods (soup, rice, oatmeal).",
      "Hydrating fluids (fruit juices, water)."
    ],
    notToEat: [
      "Spicy, acidic, or salty foods (can irritate mouth sores).",
      "Fried and oily foods."
    ]
  },
  {
    name: "Pneumonia",
    premedication: [
      "Antibiotics (e.g., Amoxicillin, Azithromycin) if bacterial.",
      "Antiviral drugs if caused by viruses."
    ],
    treatmentPlan: [
      "Rest and breathing exercises.",
      "Use of humidifiers to ease breathing."
    ],
    dietPlan: [
      "Warm soups and broths.",
      "Foods rich in antioxidants (berries, spinach)."
    ],
    notToEat: [
      "Cold drinks (may worsen coughing).",
      "Processed and sugary foods."
    ]
  }
];

const WellnessGuide = () => {
  return (
    <div className="wellness-guide">
      <Text className="wellness-guide-title">Wellness Guide</Text>
      <Collapse
        accordion
        expandIconPosition="right"
        expandIcon={({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}
      >
        {diseases.map((disease, index) => (
          <Panel
            header={<Link to={{ pathname: `/disease/${disease.name}`, state: { disease } }}>{disease.name}</Link>}
            key={index}
          >
            {/* Disease details will be passed via the Link state */}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default WellnessGuide;


