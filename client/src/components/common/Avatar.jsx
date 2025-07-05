"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
function Avatar({ type, image, setImage }) {
  const [hover, setHover] = useState(false)
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    if (!mounted) {
      setMounted(true)
    }
  }, [])

  const [isContextOpen, setIsContextOpen] = useState(false)

  const [contextMenuCoordinates, setContextMenuCoordinates] = useState({
    x: 0,
    y: 0
  })

  const showContextMenu = (e) => {
    e.preventDefault()
    setIsContextOpen(true)
    setContextMenuCoordinates({
      x: e.pageX,
      y: e.pageY
    })
  }

  const [grabPhoto, setGrabPhoto] = useState(true)

  const contextMenuOptions = [
    {
      name: "Take Photo",
      callback: () => {
        setGrabPhoto(true)
      }
    },
    {
      name: "Choose from Library",
      callback: () => { }
    },
    {
      name: "Upload Photo",
      callback: () => {
        setGrabPhoto(true)
      }
    },
    {
      name: "Remove Photo",
      callback: () => {

        setImage("/default_avatar.png")
      }
    }


  ]

  useEffect(() => {
    if (typeof window !== "undefined" && grabPhoto) {
      const timeout = setTimeout(() => {
        const input = document.getElementById("photo-picker");
        if (input) {
          input.click();
        }
      }, 100); // delay a bit to wait for mount

      // document.body.onfocus = () => {
      //   setGrabPhoto(false);
      // };

      return () => clearTimeout(timeout);
    }
  }, [grabPhoto]);

  async function photoPickerChange(e) {
    console.log(e, "mental")
    const file = e.target.files[0]
    console.log({ file })
    const reader = new FileReader()
    const data = document.createElement("img")
    reader.onload = function (event) {
      data.src = event.target.result
      data.setAttribute("data-src", event.target.result)
    }
    reader.readAsDataURL(file)

    console.log(data.src, "@issue")
    setTimeout(() => {
      setImage(data.src)
    }, 100)
  }
  return <>
    <div className="flex items-center justify-center">
      {
        type === "sm" &&
        <div className="relative h-10 w-10">
          <Image src={image} alt="avatar" className="rounded-full " fill />
        </div>
      }
      {
        type === "lg" &&
        <div className="relative size-14">
          <Image src={image} alt="avatar" className="rounded-full " fill />
        </div>
      }
      {
        type === "xl" &&
        <div className="relative cursor-pointer z-0"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className={`bg-photopicker-overlay-background size-60 absolute top-0 left-0 z-[1] flex items-center rounded-full justify-center flex-col text-center gap-2 ${hover ? "visible" : "hidden"}`}
            onClick={showContextMenu}
            id="context-opener"

          >
            <FaCamera
              className="text-2xl"
              id="context-opener"
            />
            <span>
              Change<br /> Profile Photo
            </span>
          </div>
          <div className="flex items-center justify-center relative size-60 z-[-1] cursor-pointer">
            <Image src={image} alt="avatar" className="rounded-full " fill />
          </div>
        </div>
      }
    </div>
    {
      isContextOpen ? <ContextMenu
        options={contextMenuOptions}
        coordinates={contextMenuCoordinates}
        contextMenu={isContextOpen}
        setContextMenu={setIsContextOpen}
      />
        :
        <>
        </>
    }

    <PhotoPicker onChange={photoPickerChange} />

  </>

}




export default Avatar;
