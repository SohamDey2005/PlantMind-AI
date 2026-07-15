import { useEffect, useState } from "react";

import StatCard from "../components/StatCard";
import RecommendationCard from "../components/RecommendationCard";
import RecentDocuments from "../components/RecentDocuments";
import ActivityTimeline from "../components/ActivityTimeline";

import {
  FileText,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

import {
  getDashboardStats,
  getRecentDocuments,
} from "../services/dashboardService";

export default function Dashboard() {
  const [stats, setStats] = useState({
    documents: 0,
    ready: 0,
    processing: 0,
    failed: 0,
  });

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const dashboardStats =
        await getDashboardStats();

      const docs =
        await getRecentDocuments();

      setStats(dashboardStats);

      setDocuments(docs);
    } catch (error) {
      console.log(error);
    }
  }

  const dashboardCards = [
    {
      title: "Documents",
      value: stats.documents,
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Ready",
      value: stats.ready,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Processing",
      value: stats.processing,
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      title: "Failed",
      value: stats.failed,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-100",
    },
  ];

  const activities = [
    "Dashboard Loaded",
    `${stats.documents} Documents Available`,
    `${stats.ready} Ready`,
    `${stats.processing} Processing`,
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {dashboardCards.map((item) => (
          <StatCard
            key={item.title}
            {...item}
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <RecentDocuments
          documents={documents}
        />

        <RecommendationCard />
      </div>

      <ActivityTimeline
        activities={activities}
      />
    </div>
  );
}