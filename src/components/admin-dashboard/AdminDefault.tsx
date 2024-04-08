import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components"
import Link from "next/link"


const AdminDefault = ()=>{

    return (
     <div>
        <div className="h-[50vh] w-full flex flex-col items-center justify-center">
            <div >
                <Link href={"/admin-dashboard/create-account"}>
                    <div>
                        Create An Account
                    </div>
                </Link>
            </div>
            <div >
                <LoginLink>Sign In</LoginLink>
            </div>
        </div>
     </div>
    )
}

export  default AdminDefault