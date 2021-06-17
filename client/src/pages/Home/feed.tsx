import { Card } from "./card";
import StackGrid from "react-stack-grid";
export const Feed = (props: any) => {
  return (
    <div>
      <StackGrid columnWidth={300} gutterHeight={25} gutterWidth={25}>
        {props.posts.map((post: any) => (
          <Card />
        ))}
      </StackGrid>
    </div>
  );
};
