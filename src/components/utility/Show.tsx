import { Children } from "react";

export const Show = (props: any) => {
  let when: any = null;
  let otherwise = null;
  Children.forEach(props.children, (children) => {
    if (children.props.isTrue === undefined) {
      otherwise = children;
    } else if (!when && children.props.isTrue) {
      when = children;
    }
  });
  return when || otherwise;
};

Show.When = ({
  isTrue,
  children,
}: {
  isTrue?: boolean;
  children: React.ReactNode;
}) => isTrue && children;
Show.Else = ({ children }: { children: React.ReactNode }) => children;
