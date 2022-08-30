import {NextPage} from "next";
import {useSession} from "next-auth/react";

const Protected: NextPage = () => {
    const {data: session} = useSession();

    return (
        <div>
            <span>Protected : {JSON.stringify(session)}</span>
        </div>
    );
};

export default Protected