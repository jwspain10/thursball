import { BackButton } from "./BackButton";

interface Props {
  children: string | React.ReactNode;
  goBack?: boolean;
}

export const SubHeader = ({ children, goBack }: Props) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {goBack && <BackButton />}
      <h2>{children}</h2>
    </div>
  );
};
