import { useParams } from "react-router-dom";

export const HomePage = () => {
  const { owner } = useParams();
  return (
    <div>
      <p>{owner}</p>
    </div>
  );
};
