"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AlertCircle,
  ArrowRight,
  GraduationCap,
  MapPin,
  Search as SearchIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { formatFees, formatPackage } from "@/lib/utils";

type Chance = "High" | "Medium" | "Low";
type ExamId = "jee_advanced" | "jee_main" | "cat" | "gate";

interface PredictorExam {
  id: ExamId;
  label: string;
  maxRank: number;
}

interface PredictorCollege {
  name: string;
  city: string;
  state: string;
  fees: number;
  rating: number;
  avgPackage: number;
  established: number;
  type: string;
  tags: string[];
  image: string;
  getChance: (exam: ExamId, rank: number) => Chance;
}

const IMAGES = [
  "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
  "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
];

const EXAMS: PredictorExam[] = [
  { id: "jee_advanced", label: "JEE Advanced", maxRank: 50000 },
  { id: "jee_main", label: "JEE Main", maxRank: 1000000 },
  { id: "cat", label: "CAT", maxRank: 200000 },
  { id: "gate", label: "GATE", maxRank: 200000 },
];

const COLLEGES: PredictorCollege[] = [
  {
    name: "IIT Madras",
    city: "Chennai",
    state: "Tamil Nadu",
    fees: 120000,
    rating: 4.9,
    avgPackage: 2200000,
    established: 1959,
    type: "Public/Govt",
    tags: ["iit_top"],
    image: IMAGES[0],
    getChance: (exam, rank) => {
      if (exam !== "jee_advanced") return "Low";
      if (rank <= 500) return "High";
      if (rank <= 1500) return "Medium";
      return "Low";
    },
  },
  {
    name: "IIT Bombay",
    city: "Mumbai",
    state: "Maharashtra",
    fees: 150000,
    rating: 4.9,
    avgPackage: 2500000,
    established: 1958,
    type: "Public/Govt",
    tags: ["iit_top"],
    image: IMAGES[1],
    getChance: (exam, rank) => {
      if (exam !== "jee_advanced") return "Low";
      if (rank <= 500) return "High";
      if (rank <= 1500) return "Medium";
      return "Low";
    },
  },
  {
    name: "IIT Delhi",
    city: "Delhi",
    state: "Delhi",
    fees: 140000,
    rating: 4.8,
    avgPackage: 2300000,
    established: 1961,
    type: "Public/Govt",
    tags: ["iit_top"],
    image: IMAGES[2],
    getChance: (exam, rank) => {
      if (exam !== "jee_advanced") return "Low";
      if (rank <= 500) return "High";
      if (rank <= 1500) return "Medium";
      return "Low";
    },
  },
  {
    name: "NIT Trichy",
    city: "Tiruchirappalli",
    state: "Tamil Nadu",
    fees: 180000,
    rating: 4.5,
    avgPackage: 1600000,
    established: 1964,
    type: "Public/Govt",
    tags: ["nit_top"],
    image: IMAGES[3],
    getChance: (exam, rank) => {
      if (exam !== "jee_main" && exam !== "jee_advanced") return "Low";
      if (rank <= 10000) return "High";
      if (rank <= 25000) return "Medium";
      return "Low";
    },
  },
  {
    name: "NIT Warangal",
    city: "Warangal",
    state: "Telangana",
    fees: 150000,
    rating: 4.3,
    avgPackage: 1200000,
    established: 1959,
    type: "Public/Govt",
    tags: ["nit_top"],
    image: IMAGES[4],
    getChance: (exam, rank) => {
      if (exam !== "jee_main" && exam !== "jee_advanced") return "Low";
      if (rank <= 10000) return "High";
      if (rank <= 25000) return "Medium";
      return "Low";
    },
  },
  {
    name: "BITS Pilani",
    city: "Pilani",
    state: "Rajasthan",
    fees: 250000,
    rating: 4.5,
    avgPackage: 1500000,
    established: 1964,
    type: "Private",
    tags: ["private_top"],
    image: IMAGES[0],
    getChance: (exam, rank) => {
      if (exam !== "jee_main") return "Low";
      if (rank <= 20000) return "High";
      if (rank <= 60000) return "Medium";
      return "Low";
    },
  },
  {
    name: "VIT Vellore",
    city: "Vellore",
    state: "Tamil Nadu",
    fees: 450000,
    rating: 4.3,
    avgPackage: 1400000,
    established: 1984,
    type: "Private",
    tags: ["private_mid"],
    image: IMAGES[1],
    getChance: (exam, rank) => {
      if (exam !== "jee_main") return "Low";
      if (rank <= 100000) return "High";
      return "Medium";
    },
  },
  {
    name: "IIM Ahmedabad",
    city: "Ahmedabad",
    state: "Gujarat",
    fees: 2500000,
    rating: 4.9,
    avgPackage: 3500000,
    established: 1961,
    type: "Public/Govt",
    tags: ["mba_top"],
    image: IMAGES[2],
    getChance: (exam, rank) => {
      if (exam !== "cat") return "Low";
      if (rank <= 50) return "High";
      if (rank <= 200) return "Medium";
      return "Low";
    },
  },
  {
    name: "XLRI Jamshedpur",
    city: "Jamshedpur",
    state: "Jharkhand",
    fees: 2300000,
    rating: 4.8,
    avgPackage: 2800000,
    established: 1949,
    type: "Private",
    tags: ["mba_top"],
    image: IMAGES[3],
    getChance: (exam, rank) => {
      if (exam !== "cat") return "Low";
      if (rank <= 50) return "High";
      if (rank <= 200) return "Medium";
      return "Low";
    },
  },
];

function getMaxRank(examId: ExamId | ""): number | null {
  if (!examId) return null;
  const exam = EXAMS.find((e) => e.id === examId);
  return exam ? exam.maxRank : null;
}

function getChanceOrder(chance: Chance): number {
  if (chance === "High") return 0;
  if (chance === "Medium") return 1;
  return 2;
}

function ChanceBadge({ chance }: { chance: Chance }) {
  const classes =
    chance === "High"
      ? "border-green-200 bg-green-50 text-green-700"
      : chance === "Medium"
        ? "border-yellow-200 bg-yellow-50 text-yellow-700"
        : "border-red-200 bg-red-50 text-red-600";

  const dot =
    chance === "High"
      ? "bg-green-500"
      : chance === "Medium"
        ? "bg-yellow-500"
        : "bg-red-500";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${classes}`}
    >
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {chance}
    </span>
  );
}

export default function PredictorPage() {
  const [exam, setExam] = useState<ExamId | "">("");
  const [rank, setRank] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Array<PredictorCollege & { chance: Chance }>>([]);

  const maxRank = useMemo(() => getMaxRank(exam), [exam]);

  const handlePredict = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!exam) {
      setError("Please select an exam.");
      return;
    }

    if (!rank.trim()) {
      setError("Please enter your rank.");
      return;
    }

    const parsedRank = Number(rank);
    if (!Number.isFinite(parsedRank) || parsedRank <= 0) {
      setError("Rank must be a positive number.");
      return;
    }

    if (maxRank === null) {
      setError("Invalid exam selection.");
      return;
    }

    if (parsedRank > maxRank) {
      setError(`Rank must not exceed ${maxRank.toLocaleString("en-IN")}.`);
      return;
    }

    const predicted = COLLEGES.map((college) => ({
      ...college,
      chance: college.getChance(exam, parsedRank),
    }))
      .filter((college) => {
        if (college.chance !== "Low") return true;
        return parsedRank < 50000;
      })
      .sort((a, b) => getChanceOrder(a.chance) - getChanceOrder(b.chance));

    setResults(predicted);
    setSubmitted(true);
  };

  const handleReset = () => {
    setExam("");
    setRank("");
    setError(null);
    setSubmitted(false);
    setResults([]);
  };

  const chanceLegend = (
    <div className="flex items-center gap-3 text-sm text-gray-600">
      <span className="inline-flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-green-500" />
        High
      </span>
      <span className="inline-flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-yellow-500" />
        Medium
      </span>
      <span className="inline-flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-red-500" />
        Low
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-5 text-4xl font-bold text-gray-900">
            College Predictor
          </h1>
          <p className="mt-3 text-gray-500">
            Get realistic chances based on your exam and rank.
          </p>
        </div>

        <div className="mt-8 mx-auto max-w-3xl">
          <form
            onSubmit={handlePredict}
            className="rounded-2xl bg-white p-7 shadow-sm"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="exam"
                  className="text-sm font-medium text-gray-700"
                >
                  Select Exam *
                </label>
                <select
                  id="exam"
                  value={exam}
                  onChange={(event) => setExam(event.target.value as ExamId | "")}
                  className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
                >
                  <option value="" disabled>
                    Choose an exam
                  </option>
                  {EXAMS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="rank"
                  className="text-sm font-medium text-gray-700"
                >
                  Your Rank *
                </label>
                <div className="mt-1 flex items-baseline justify-between gap-3">
                  <span className="text-sm text-gray-500">
                    {maxRank !== null ? `(max: ${maxRank.toLocaleString("en-IN")})` : ""}
                  </span>
                </div>
                <input
                  id="rank"
                  inputMode="numeric"
                  type="number"
                  value={rank}
                  onChange={(event) => setRank(event.target.value)}
                  placeholder="e.g. 1200"
                  className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
                />
              </div>
            </div>

            {error && (
              <div className="mt-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">
                <AlertCircle className="mt-0.5 h-5 w-5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
              >
                <SearchIcon className="h-4 w-4" />
                Predict Colleges
              </button>

              {submitted && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
                >
                  Reset
                </button>
              )}
            </div>
          </form>
        </div>

        {submitted && (
          <div className="mt-10">
            {results.length > 0 ? (
              <>
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <h2 className="text-lg font-bold text-gray-900">
                    {results.length} colleges match your profile
                  </h2>
                  <div className="sm:ml-auto">{chanceLegend}</div>
                </div>

                <div className="mt-6 space-y-4">
                  {results.map((college) => (
                    <div
                      key={college.name}
                      className="flex flex-row gap-4 rounded-2xl bg-white p-5 items-start"
                    >
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                        {college.image ? (
                          <Image
                            src={college.image}
                            alt={college.name}
                            width={80}
                            height={80}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <span className="text-3xl font-bold text-gray-500">
                              {college.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-lg font-bold text-gray-900">
                            {college.name}
                          </h3>
                          <ChanceBadge chance={college.chance} />
                        </div>

                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>
                            {college.city}, {college.state}
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          <span className="text-sm font-medium text-gray-800">
                            {formatFees(college.fees)}
                          </span>
                          <StarRating rating={college.rating} size="sm" />
                          <span className="text-sm font-semibold text-green-700">
                            {formatPackage(college.avgPackage)}
                          </span>
                          <Badge type={college.type} />
                        </div>

                        <div className="mt-4">
                          <Link
                            href="/colleges"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition hover:text-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 rounded"
                          >
                            View
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="mx-auto flex max-w-xl flex-col items-center rounded-2xl bg-white p-10 text-center shadow-sm">
                <GraduationCap className="h-16 w-16 text-gray-300" />
                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  No matching colleges found
                </h2>
                <Link
                  href="/colleges"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
                >
                  Browse all colleges
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

