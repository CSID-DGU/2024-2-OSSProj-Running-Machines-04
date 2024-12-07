import SpinnerIcon from "@/assets/icons/SpinnerIcon.gif";

const Spinner = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <img src={SpinnerIcon} alt="Loading spinner" />
    </div>
  );
};

export default Spinner;
