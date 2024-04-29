import React, { useState } from "react";
import Plot from "react-plotly.js";
import axios from "axios";

function HomeDisplay() {
  const [resume, setResume] = useState(null);
  const [graphData, setGraphData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResume(file);
      uploadAndProcessResume(file);
    }
  };

  const uploadAndProcessResume = async (file) => {
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post("/api/process-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setGraphData(response.data); // Assume response contains the Plotly graph data
    } catch (error) {
      console.error("Error processing resume:", error);
      // Handle errors here
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {graphData && <Plot data={graphData.data} layout={graphData.layout} />}
    </div>
  );
}

export default HomeDisplay;
