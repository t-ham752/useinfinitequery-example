import { useMemo } from "react";

type Props = {
  id: number;
};

export const Card = ({ id }: Props) => {
  const bgColor = useMemo(
    () => "#" + Math.floor(Math.random() * 16777215).toString(16),
    []
  );

  return (
    <div
      style={{
        height: 200,
        backgroundColor: bgColor,
        display: "flex",
        padding: "12px 0 0 12px",
        border: "1px solid #000",
      }}
    >
      {id}
    </div>
  );
};
