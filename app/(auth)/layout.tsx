import React, { PropsWithChildren } from "react";

const Authlayout = ({ children }: PropsWithChildren) => {

    return(
<div className="flex justify-center pt-20">
{children}
</div>
    )
};

export default Authlayout;