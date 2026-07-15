import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getCompliance } from "../services/complianceService";

export default function Compliance() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, []);

  async function loadReport() {
    try {
      // Change 1 to another document ID if needed
      const data = await getCompliance(1);

      setReport(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <h2 className="text-xl font-semibold">
        Loading Compliance Report...
      </h2>
    );
  }

  if (!report) {
    return (
      <h2 className="text-red-500">
        Failed to load compliance report.
      </h2>
    );
  }

  return (
    <div className="space-y-6">

      <h1 className="text-4xl font-bold">
        Compliance Report
      </h1>

      {/* Score */}

      <Card>

        <div className="text-center">

          <h2 className="text-lg text-gray-500">
            Compliance Score
          </h2>

          <div
            className={`text-6xl font-bold mt-4 ${
              report.score >= 80
                ? "text-green-600"
                : report.score >= 60
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {report.score}%
          </div>

        </div>

      </Card>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Passed */}

        <Card>

          <h2 className="text-2xl font-bold mb-4 text-green-600">
            Passed
          </h2>

          <ul className="space-y-2">

            {report.passed.map((item, index) => (

              <li key={index}>
                ✅ {item}
              </li>

            ))}

          </ul>

        </Card>

        {/* Missing */}

        <Card>

          <h2 className="text-2xl font-bold mb-4 text-red-600">
            Missing
          </h2>

          <ul className="space-y-2 max-h-96 overflow-y-auto">

            {report.missing.map((item, index) => (

              <li key={index}>
                ❌ {item}
              </li>

            ))}

          </ul>

        </Card>

      </div>

      {/* Recommendation */}

      <Card>

        <h2 className="text-2xl font-bold mb-4">
          AI Recommendation
        </h2>

        <p className="leading-8">
          {report.recommendation}
        </p>

      </Card>

    </div>
  );
}