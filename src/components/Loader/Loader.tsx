import ClipLoader from "react-spinners/ClipLoader";

interface Props {
  isLoading: boolean;
  size: number;
  loaderColour: string;
}

const Loader: React.FC<Props> = ({ isLoading, size, loaderColour }) => {
  const override = {
    border: `3px solid ${loaderColour}`,
  };

  return (
    <ClipLoader
      color={loaderColour}
      loading={isLoading}
      cssOverride={override}
      size={size}
    />
  );
};

export default Loader;
