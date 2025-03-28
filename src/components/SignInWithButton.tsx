interface SignInWithButtonProps {
  image: string;
  altText: string;
  text: string;
}
const SignInWithButton = ({ image, altText, text }: SignInWithButtonProps) => {
  return (
    <div className="border border-[#EEEEEE] bg-[#FAFAFA] rounded-lg cursor-pointer w-full py-3 px-10 flex items-center justify-start gap-14">
      <img src={image} alt={altText} width={18} height={18} />
      <div className="text-[#616161] text-sm font-normal">{text}</div>
    </div>
  );
};

export default SignInWithButton;
