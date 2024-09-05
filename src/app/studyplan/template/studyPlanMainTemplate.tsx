import { MiddleBoxColumn } from "@/src/components/elements/styledElements";
import { ReactNode } from "react";

const StudyPlanMainTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <MiddleBoxColumn
      maxWidth="1165px"
      sx={{
        paddingX: {
          xs: "0px",
          sm: "25px",
        },
        boxSizing: "border-box",
        marginTop: "128px",
      }}
    >
      {children}
    </MiddleBoxColumn>
  );
};
export default StudyPlanMainTemplate;
