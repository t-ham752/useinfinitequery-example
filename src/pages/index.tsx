import { useInfiniteDataQuery } from "@/api";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Card } from "@/components";

export default function Home() {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteDataQuery();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  const flattedData = data.pages.map((page) => page.messages).flat();

  return (
    <div
      className="App"
      style={{
        maxHeight: "500px",
        overflow: "auto",
      }}
    >
      {flattedData.map((item) => {
        return <Card key={item.id} id={item.id} />;
      })}

      {isFetchingNextPage && <div>Loading...</div>}

      <div style={{ visibility: "hidden", height: 0 }} ref={ref}>
        <div />
      </div>
    </div>
  );
}
