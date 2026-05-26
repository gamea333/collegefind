import Image from "next/image";
import { MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { AddToCompareButton } from "@/components/college/AddToCompareButton";
import { CollegeDetailTabs } from "@/components/college/CollegeDetailTabs";
import { SaveCollegeButton } from "@/components/college/SaveCollegeButton";
import { TrackView } from "@/components/college/TrackView";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { prisma } from "@/lib/prisma";
import { formatFees, formatPackage } from "@/lib/utils";
import type { CollegeCard } from "@/types/college";

interface PageProps {
  params: { id: string };
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  try {
    const colleges = await prisma.college.findMany({
      select: { id: true },
    });
    return colleges.map((college) => ({ id: college.id }));
  } catch {
    return [];
  }
}

export default async function CollegeDetailPage({ params }: PageProps) {
  const college = await prisma.college.findUnique({
    where: { id: params.id },
  });

  if (!college) {
    notFound();
  }

  const collegeCard: CollegeCard = {
    id: college.id,
    name: college.name,
    city: college.city,
    state: college.state,
    fees: college.fees,
    rating: college.rating,
    avgPackage: college.avgPackage,
    type: college.type,
    image: college.image,
    established: college.established,
  };

  const reviewCount = Math.round(college.rating * 420 + college.established);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 pb-24">
      <TrackView college={collegeCard} />
      <section>
        <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-gray-100">
          {college.image ? (
            <Image
              src={college.image}
              alt={college.name}
              fill
              priority
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 text-6xl font-bold text-gray-500">
              {college.name.charAt(0)}
            </div>
          )}
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">{college.name}</h1>
        <p className="mt-2 flex items-center gap-2 text-gray-600">
          <MapPin className="h-5 w-5 text-gray-400" />
          {college.location}, {college.city}, {college.state}
        </p>
        <div className="mt-4">
          <StarRating
            rating={college.rating}
            showNumber
            reviewCount={reviewCount}
            size="md"
          />
        </div>
      </section>

      <div className="mt-4 grid grid-cols-2 gap-4 rounded-xl border border-gray-100 bg-white p-4 sm:grid-cols-4">
        <div>
          <p className="text-xs text-gray-500">Annual Fees</p>
          <p className="mt-1 font-bold text-gray-900">
            {formatFees(college.fees)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Avg Package</p>
          <p className="mt-1 font-bold text-gray-900">
            {formatPackage(college.avgPackage)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Established</p>
          <p className="mt-1 font-bold text-gray-900">{college.established}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Type</p>
          <div className="mt-1">
            <Badge type={college.type} />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6 lg:flex-row">
        <div className="lg:w-[65%]">
          <CollegeDetailTabs college={college} />
        </div>

        <aside className="lg:w-[35%]">
          <div className="sticky top-24 space-y-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <AddToCompareButton college={collegeCard} />
            <SaveCollegeButton collegeId={college.id} />

            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-sm font-semibold text-gray-900">Quick Stats</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li className="flex justify-between">
                  <span>City</span>
                  <span className="font-medium text-gray-900">{college.city}</span>
                </li>
                <li className="flex justify-between">
                  <span>State</span>
                  <span className="font-medium text-gray-900">{college.state}</span>
                </li>
                <li className="flex justify-between">
                  <span>Courses</span>
                  <span className="font-medium text-gray-900">
                    {college.courses.length}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Rating</span>
                  <span className="font-medium text-gray-900">
                    {college.rating.toFixed(1)} / 5
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
