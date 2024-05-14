import { Modal } from "react-bootstrap";
import Plot from "react-plotly.js";

const layout = {
    height: 500,
    margin: {
        b: 20,
        t: 20,
    },
    polar: {
        radialaxis: {
            visible: false,
        },
        bgcolor: "#202020",
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
    paper_bgcolor: "#202020",
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

const SVDGraph = ({ show, handleClose, categories, values }) => {

    let d = [
        {
            type: "scatterpolar",
            r: values,
            theta: categories,
            fill: "toself",
            fillcolor: "lightgreen",
            name: "Contribution Percentages",
        },
    ];

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Body>
                <Plot data={d} layout={layout} />
            </Modal.Body>
        </Modal>
    )
};

export default SVDGraph;
