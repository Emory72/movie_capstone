import React from "react";
import { userInfo } from "../../apis/userAPI";
import { useQuery } from "@tanstack/react-query";

import ProfileCardWidget from "./ProfileCardWidget/ProfileCardWidget";
import GeneralInfoForm from "./GeneralInfoForm/GeneralInfoForm";
import TicketHistory from "./TicketHistory/TicketHistory";
export default function UserInfo() {
  const { data: info, isLoading } = useQuery({
    queryKey: ["info"],
    queryFn: userInfo,
  });

  return (
    <div className="row bg-white fs-5">
      <div className="col-3 shadow rounded mb-5">
        <GeneralInfoForm info={info} />
      </div>
      <div className="col py-5">
        <div className="container">
          <ProfileCardWidget info={info} />
          <TicketHistory ticketHistoryInfo={info} />
        </div>
      </div>
    </div>
  );
}
