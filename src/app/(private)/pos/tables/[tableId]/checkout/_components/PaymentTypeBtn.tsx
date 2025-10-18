type PaymentTypeBtnProps = {
  title: string;
  name: string;
};

export default function PaymentTypeBtn({ title, name }: PaymentTypeBtnProps) {
  return (
    <button className="flex flex-col w-40 h-40 justify-center items-center rounded-xl bg-[#f3f4f5] cursor-pointer gap-2 hover:bg-[#e6e7e8] hover:shadow-md hover:scale-102 transition duration-200 ease-out">
      <p className="toss-font text-3xl">{title}</p>
      <p className="toss-font text-xl">{name}</p>
    </button>
  );
}
