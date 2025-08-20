import { ButtonProps } from "@/interfaces";

const Button: React.FC<ButtonProps> = ({ title, action }) => {
  return (
    <button
      onClick={action}
      className="px-6 py-2 rounded-full border-2 border-[#E2D609] hover:bg-[#E2D609] hover:text-black text-white transition duration-300"
    >
      {title}
    </button>
  );
};

export default Button;
