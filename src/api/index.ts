import { useInfiniteQuery } from "@tanstack/react-query";

type Message = {
  id: number;
};
type APIResponse = {
  messages: Message[];
  meta: {
    preview_cursor: number | null;
    next_cursor: number | null;
  };
};

const data: Record<number, APIResponse> = {
  0: {
    messages: [{ id: 1 }, { id: 2 }, { id: 3 }],
    meta: {
      preview_cursor: null,
      next_cursor: 3,
    },
  },
  3: {
    messages: [{ id: 4 }, { id: 5 }, { id: 6 }],
    meta: {
      preview_cursor: 0,
      next_cursor: 6,
    },
  },
  6: {
    messages: [{ id: 7 }, { id: 8 }, { id: 9 }],
    meta: {
      preview_cursor: 3,
      next_cursor: 9,
    },
  },
  9: {
    messages: [{ id: 10 }, { id: 11 }, { id: 12 }],
    meta: {
      preview_cursor: 6,
      next_cursor: 12,
    },
  },
  12: {
    messages: [{ id: 13 }, { id: 14 }, { id: 15 }],
    meta: {
      preview_cursor: 9,
      next_cursor: 15,
    },
  },
  15: {
    messages: [{ id: 16 }, { id: 17 }, { id: 18 }],
    meta: {
      preview_cursor: 12,
      next_cursor: null,
    },
  },
};

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fetchData = async (param: number): Promise<APIResponse> => {
  await sleep(3000);
  return data[param];
};

export const useInfiniteDataQuery = () => {
  return useInfiniteQuery({
    queryKey: ["data"],
    queryFn: ({ pageParam }) => fetchData(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage: APIResponse) =>
      lastPage.meta.next_cursor != null ? lastPage.meta.next_cursor : undefined,
  });
};
