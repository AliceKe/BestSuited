import { Modal } from "react-bootstrap";
import Plot from "react-plotly.js";

//Layout from Spotify sound suggest
const layout = {
  height: 500,
  margin: {
    b: 20,
    t: 20,
    r: 0,
    l: 20,
  },
  polar: {
    radialaxis: {
      visible: false,
    },
    bgcolor: "white",
  },
  showlegend: true,
  legend: {
    bgcolor: "rgba(0,0,0,0)",
    xanchor: "center",
    yanchor: "top",
    y: -0.3,
    x: 0.5,
  },
  font: {
    size: 10,
    color: "#aaaaaa",
    family: "Figtree, sans-serif",
  },
  paper_bgcolor: "white",
  title: {
    text: "Top Contributing Words",
    font: {
      size: 24,
    },
    pad: {
      t: 15,
      b: 30,
    },
    xref: "paper",
    yref: "paper",
    automargin: true,
  },
};

const SVDGraph = ({ show, handleClose, data }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>SVD Dimension Contributions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Plot
          data={[
            {
              type: "scatterpolar",
              r: data.words,
              theta: data.values,
              fill: "toself",
              fillcolor: "lightgreen",
              name: "Contribution Percentages",
            },
          ]}
          layout={layout}
        />
      </Modal.Body>
    </Modal>
  );
};

export default SVDGraph;
