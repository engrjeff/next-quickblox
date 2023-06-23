const RenderIf = ({
  condition,
  children,
}: {
  condition: boolean;
  children: React.ReactNode;
}) => {
  return <>{condition === true ? children : null}</>;
};

export default RenderIf;
