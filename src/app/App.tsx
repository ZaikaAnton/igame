import Typography from "@/components/Typography/Typography";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      {/* <Typography variantClass="text-16-700" style={{ color: "red" }}>
        App
      </Typography>
      <Typography as="h1" variantClass="text-16-700" style={{ color: "red" }}>
        App
      </Typography> */}
      <Outlet />
    </>
  );
};

export default App;
