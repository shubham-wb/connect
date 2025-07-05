import Input from "@/components/common/Input";
import { useStateProvider } from "@/context/StateContext";
import Image from "next/image";
import React, { useState } from "react";
import Avatar from "@/components/common/Avatar";
function onboarding() {


  const [{ userInfo }] = useStateProvider()
  console.log("userInfo", userInfo);

  const [name, setName] = useState(userInfo?.name || "")
  const [about, setAbout] = useState("")
  const [image, setImage] = useState("/default_avatar.png")


  return <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-stretch justify-center">
    <div className="h-12 px-6 py-2">
      <div className="flex items-center gap-3">

        <Image
          src="/whatsapp.svg"
          alt="whatsapp"
          height={48}
          width={48}
        />
        <div className="font-bold text-2xl">
          Whatsapp
        </div>
      </div>
    </div>
    <div className="flex-1 w-full flex justify-center items-center">
      <div className="flex flex-col items-center justify-center mt=5 gap-6">
        <Input
          name="Display Name"
          state={name}
          setState={setName}
          label
        />
        <Input
          name="About"
          state={about}
          setState={setAbout}
          label
        />

      </div>
      <div>
        <Avatar type="xl" image={image} setImage={setImage} />
      </div>
    </div>
  </div>
}

export default onboarding;
