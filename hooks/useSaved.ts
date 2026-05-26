"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";
import { toCollegeCard } from "@/lib/college-card";
import type { College, CollegeCard, PaginatedColleges, SavedCollege } from "@/types/college";

interface SavedApiResponse {
  saved: SavedCollegeWithCollege[];
}

interface SavedCollegeWithCollege extends SavedCollege {
  college: CollegeCard;
}

function createPlaceholderCollegeCard(collegeId: string): CollegeCard {
  return {
    id: collegeId,
    name: "Saved college",
    city: "",
    state: "",
    fees: 0,
    rating: 0,
    avgPackage: 0,
    type: "",
    image: null,
    established: 0,
  };
}

function findCollegeCardInCache(
  queryClient: QueryClient,
  collegeId: string
): CollegeCard | undefined {
  const collegeQueries = queryClient.getQueriesData<PaginatedColleges>({
    queryKey: ["colleges"],
  });

  for (const [, data] of collegeQueries) {
    const match = data?.colleges.find((college) => college.id === collegeId);
    if (match) {
      return match;
    }
  }

  const compareQueries = queryClient.getQueriesData<College[]>({
    queryKey: ["compare"],
  });

  for (const [, data] of compareQueries) {
    const match = data?.find((college) => college.id === collegeId);
    if (match) {
      return toCollegeCard(match);
    }
  }

  return undefined;
}

async function fetchSaved(): Promise<SavedCollegeWithCollege[]> {
  const response = await fetch("/api/saved");

  if (!response.ok) {
    const body = (await response.json()) as { error?: string };
    throw new Error(body.error ?? "Failed to fetch saved colleges");
  }

  const data = (await response.json()) as SavedApiResponse;
  return data.saved;
}

export interface UseSavedReturn {
  savedIds: string[];
  toggleSave: (collegeId: string) => Promise<void>;
  isSaved: (id: string) => boolean;
  isLoading: boolean;
}

export function useSaved(): UseSavedReturn {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const isAuthenticated = status === "authenticated" && !!session?.user;

  const { data: savedList = [], isLoading } = useQuery({
    queryKey: ["saved"],
    queryFn: fetchSaved,
    enabled: isAuthenticated,
  });

  const savedIds = useMemo(
    () => savedList.map((item) => item.collegeId),
    [savedList]
  );

  const saveMutation = useMutation<
    { saved: SavedCollegeWithCollege },
    Error,
    string,
    { previous: SavedCollegeWithCollege[] | undefined }
  >({
    mutationFn: async (collegeId: string) => {
      const response = await fetch("/api/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeId }),
      });

      if (!response.ok) {
        const body = (await response.json()) as { error?: string };
        throw new Error(body.error ?? "Failed to save college");
      }

      return response.json() as Promise<{ saved: SavedCollegeWithCollege }>;
    },
    onMutate: async (collegeId: string) => {
      await queryClient.cancelQueries({ queryKey: ["saved"] });
      const previous = queryClient.getQueryData<SavedCollegeWithCollege[]>([
        "saved",
      ]);

      const cachedCollege =
        findCollegeCardInCache(queryClient, collegeId) ??
        createPlaceholderCollegeCard(collegeId);

      queryClient.setQueryData<SavedCollegeWithCollege[]>(["saved"], (old) => {
        const list = old ?? [];
        if (list.some((item) => item.collegeId === collegeId)) {
          return list;
        }
        return [
          {
            id: `optimistic-${collegeId}`,
            userId: session?.user?.id ?? "",
            collegeId,
            college: cachedCollege,
          },
          ...list,
        ];
      });

      return { previous };
    },
    onError: (_error, _collegeId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["saved"], context.previous);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["saved"] });
    },
  });

  const unsaveMutation = useMutation<
    void,
    Error,
    string,
    { previous: SavedCollegeWithCollege[] | undefined }
  >({
    mutationFn: async (collegeId: string) => {
      const response = await fetch("/api/saved", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeId }),
      });

      if (!response.ok) {
        const body = (await response.json()) as { error?: string };
        throw new Error(body.error ?? "Failed to remove saved college");
      }
    },
    onMutate: async (collegeId: string) => {
      await queryClient.cancelQueries({ queryKey: ["saved"] });
      const previous = queryClient.getQueryData<SavedCollegeWithCollege[]>([
        "saved",
      ]);

      queryClient.setQueryData<SavedCollegeWithCollege[]>(["saved"], (old) =>
        (old ?? []).filter((item) => item.collegeId !== collegeId)
      );

      return { previous };
    },
    onError: (_error, _collegeId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["saved"], context.previous);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["saved"] });
    },
  });

  const toggleSave = useCallback(
    async (collegeId: string): Promise<void> => {
      if (!isAuthenticated) {
        return;
      }

      if (savedIds.includes(collegeId)) {
        await unsaveMutation.mutateAsync(collegeId);
      } else {
        await saveMutation.mutateAsync(collegeId);
      }
    },
    [isAuthenticated, savedIds, saveMutation, unsaveMutation]
  );

  const isSaved = useCallback(
    (id: string): boolean => savedIds.includes(id),
    [savedIds]
  );

  return {
    savedIds,
    toggleSave,
    isSaved,
    isLoading: isAuthenticated && isLoading,
  };
}
