import jsPDF from "jspdf";

function DownloadButton({ result }) {
  const handleDownload = () => {
    const doc = new jsPDF();

    doc.text("Resume Analysis Report", 10, 10);
    doc.text(`Score: ${result.matchScore}%`, 10, 20);
    doc.text(`Suggestions: ${result.suggestions}`, 10, 30);

    doc.save("report.pdf");
  };

  return (
    <button onClick={handleDownload}>
      📥 Download Report
    </button>
  );
}

export default DownloadButton;