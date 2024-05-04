import IsLoading from "../components/common/IsLoading";

const FullLoadingView = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <IsLoading className="size-44" />
    </div>
  );
};

export default FullLoadingView;
