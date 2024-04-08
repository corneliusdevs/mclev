import { FC } from "react";

interface BookingListProps {
  title: string;
  subTitle: string;
  description: string;
  timeStamp: string;
  unread?: boolean;
  clickHandler?: Function
}

const BookingList: FC<BookingListProps> = ({
  title,
  subTitle,
  description,
  timeStamp,
  unread,
  clickHandler,
  ...props
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full p-2"
    onClick={()=>{
      if (clickHandler)clickHandler()
    }}
    >
      <div className="border-2 rounded-sm p-2 relative hover:bg-slate-200 w-full">
        <div className="font-[600] ">{title}</div>
        <div className="font-[400] text-sm">{subTitle}</div>
        <div className="text-[14px] truncate text-ellipsis h-[20px] text-state-300 max-w-[230px]">
          {description}
        </div>

        <div className="text-sm absolute top-2 right-[10px] flex items-center">
          {timeStamp}
          {unread && <div className="rounded-full bg-blue-500 w-2 h-2 ml-[4px]"></div>}
        </div>
      </div>
    </div>
  );
};

export default BookingList;
