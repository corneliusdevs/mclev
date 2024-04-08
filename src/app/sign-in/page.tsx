import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <div className="h-[50vh] w-full flex flex-col items-center justify-center">
        <div>
          <Link href={"/admin-dashboard/create-account"}>
            <div className={"underline pb-2"}>Create An Account</div>
          </Link>
        </div>
        <div>
          <LoginLink>
            <div className={"underline pb-2"}>Sign In</div>
          </LoginLink>
        </div>
      </div>
    </div>
  );
};

export default Page;
