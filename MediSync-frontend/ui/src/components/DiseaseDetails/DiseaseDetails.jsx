import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom
import { diseases } from '../WellnessGuide/WellnessGuide'; // Import diseases array (if it's in a separate file)
import { Typography } from 'antd'; // Import Typography for styling

const { Text } = Typography;

const DiseaseDetails = () => {
  const { name } = useParams(); // Get the disease name from the URL
  const disease = diseases.find(d => d.name === name); // Find the disease in the array

  if (!disease) {
    return <div>Loading...</div>; // Or a "Not Found" message
  }

  return (
    <div className="disease-details">
      <h2>{disease.name}</h2>

      {/* Premedication Section */}
      <Text className="wellness-guide-text">Premedication:</Text>
      <Text className="wellness-guide-content">{disease.premedication?.join(', ') || 'N/A'}</Text>

      {/* Treatment Plan Section */}
      <Text className="wellness-guide-text">Treatment Plan:</Text>
      <Text className="wellness-guide-content">{disease.treatmentPlan?.join(', ') || 'N/A'}</Text>

      {/* Diet Plan Section */}
      <Text className="wellness-guide-text">Diet Plan:</Text>
      <Text className="wellness-guide-content">{disease.dietPlan?.join(', ') || 'N/A'}</Text>

      {/* What Not to Eat Section */}
      <Text className="wellness-guide-text">What Not to Eat:</Text>
      <Text>{disease.notToEat?.join(', ') || 'N/A'}</Text>
    </div>
  );
};

export default DiseaseDetails;

