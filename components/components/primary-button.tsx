export const PrimaryButton = (props: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const { children, onClick } = props;
  return (
    <button className="btn w-100 m-4 bg-black text-white" onClick={onClick}>
      {children}
    </button>
  );
};
