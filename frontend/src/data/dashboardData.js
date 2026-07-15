import {
  FileText,
  Bot,
  TriangleAlert,
  Factory,
} from "lucide-react";

export const stats = [
  {
    title: "Documents",
    value: 128,
    icon: FileText,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    title: "Equipment",
    value: 42,
    icon: Factory,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    title: "Incidents",
    value: 7,
    icon: TriangleAlert,
    color: "text-red-600",
    bg: "bg-red-100",
  },
  {
    title: "AI Queries",
    value: 354,
    icon: Bot,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
];

export const recentDocuments = [
  "Boiler_SOP.pdf",
  "Pump_P101_Manual.pdf",
  "Valve_Report.pdf",
  "Inspection_Log.pdf",
];

export const activities = [
  "Uploaded Boiler SOP",
  "Generated AI Summary",
  "Compliance Scan Completed",
  "Knowledge Graph Updated",
];