import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC } from "react";
import "../helpers/styles.css";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  title: string;
  subtitle: string;
  review: string;
  rating: number;
  response?: string;
}

const TestimonialCard: FC<TestimonialCardProps> = (props) => {
  const starsUi = () => {
    let i;
    const stars = [];
    for (i = 0; i < props.rating; i++) {
      stars.push(
        <Star
          key={i + "star" + Date.now.toString}
          strokeWidth={2}
          size={24}
          className="fill-secondarycol"
        />
      );
    }

    while (i < 5) {
      stars.push(
        <Star
          key={i + "star" + Date.now.toString}
          strokeWidth={2}
          size={24}
          className="text-slate-300"
        />
      );

      i++;
    }

    return stars;
  };

  return (
    <div className="flex justify-center w-[90%]">
      <Card className="flex -px-2 py-0 flex-col items-center">
        <CardHeader className="pb-2.5">
          <CardTitle className="">{props.title}</CardTitle>
          <CardDescription className="text-sm">
            {props.subtitle}
          </CardDescription>

          {props.rating && (
            <div className="text-secondarycol flex h-5">{starsUi()}</div>
          )}
        </CardHeader>
        <CardContent>
          <div className="scroll h-[72px] leading-6 w-fit mt-1.5 text-black/75 px-[3px]">
            {
              props.review
            }
          </div>
        </CardContent>
        <CardFooter>
          {
            props?.response && props&&
          <div className="scroll h-[57px] box-border border-l-[1px] border-black px-1.5 text-[13px] ml-2 -mt-2 text-black/75">
            <span className="block text-black/75 font-[600] ">Response from the Owner</span>
             {props.response}
          </div>
          }
        </CardFooter>
      </Card>
    </div>
  );
};

export default TestimonialCard;
