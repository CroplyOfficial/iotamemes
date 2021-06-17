import { Feed } from "./feed";
import { Navbar } from "./navbar";
export const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="container is-widescreen mt-5">
        <Feed posts={["a", "b", "c", "d", "e", "f", "g", "h"]} />
      </div>
    </div>
  );
};
