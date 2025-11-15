import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Container, Input, Button, Popup } from "../index";

import service from "../../../appwrite/config";
function EditProfile() {
  const userData = useSelector((state) => state.auth.userData);
  const [userInformation, setUserInformation] = useState();
  const { handleSubmit, register, reset, setValue } = useForm({
    defaultValues: {
      fullName: userInformation?.fullName || "",
      email: userInformation?.email || "",
      phoneNumber: userInformation?.phoneNumber || "",
      about: userInformation?.about || "",
      userName: userInformation?.userName || "",
    },
  });

  const setData = useMemo(() => {
    setValue("fullName", userInformation?.fullName);
    setValue("email", userInformation?.email);
    setValue("userName", userInformation?.userName);
    setValue("phoneNumber", userInformation?.phoneNumber);
    setValue("about", userInformation?.about);
  }, [userInformation]);

  // State for popup and file upload

  const [selectedFile, setSelectedFile] = useState(null);

  // React Hook Form for profile data

  // Handle profile update (main form)
  const onProfileSubmit = async (data) => {
    const upload = service.updateProfileInformationPost(userInformation.$id, {
      ...data,
      userId: userData.$id,
    });

  };

  // Handle image file select + upload
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
  
    const fileUpload = await service.fileUpload(file);
    if (fileUpload) {
      if (userInformation.profileImageId) await service.deleteFile(userInformation.profileImageId);
      await service.updateProfileInformationPost(userInformation.$id, {
        profileImageId: fileUpload.$id,
      });
    }

    setImgPopup(false);
  };
  const [profileImgUrl,setProfileImgUrl] =useState(0)
  useEffect(() => {
    const getInformation = service
      .getProfileInformationQuery(userData.$id)
      .then((information) => {
        setUserInformation(information.rows[0]);
      })
  }, [ ]);
  useEffect(()=>{
  if(userInformation) service.fileView(userInformation?.profileImageId).then((url)=>setProfileImgUrl(url))
  },[userInformation])

  const [imgPopup, setImgPopup] = useState(false);
  const [resetPopup, setResetPopup] = useState(false);
  const openImgPopUp = () => {
    setImgPopup(true);
  };
  const openResetPopUp = () => {
    setResetPopup(true);
  };

  return (
    <Container>
      {/* Popup for image upload */}
      {imgPopup && (
        <Popup
          isOpen={imgPopup}
          title= {userInformation?.profileImageId ?"Change your picture" : "Add your picture"}
          confirmText="Choose photo"
          cancelText="Cancel"
          onCancel={() => setImgPopup(false)}
          onConfirm={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = handleFileSelect;
            input.click();
          }}
        />
      )}
      {resetPopup && (
        <Popup
          isOpen={resetPopup}
          title="Are you sure to reset changes"
          confirmText="reset"
          cancelText="Cancel"
          onCancel={() => setResetPopup(false)}
          onConfirm={() => {
            reset();
            return setResetPopup(false);
          }}
        />
      )}

      <div className="w-full dark:bg-black">
        <div className="w-5/6 sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto flex flex-col gap-y-5">
          {/* Photo Section */}
          <div className="w-full flex flex-col items-start">
            <p className="text-black dark:text-white py-1">Photo</p>
            <div className="w-full flex">
              <div
                className="w-20 h-20 bg-center bg-cover rounded-full border border-black dark:border-white"
                style={{
                  backgroundImage: `url(${
                    profileImgUrl||
                    "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074"
                  })`,
                }}
              ></div>
              <span className="my-auto ml-5">
                <Button
                  className="bg-gray-200 text-gray-800"
                  onClick={openImgPopUp}
                >
               {userInformation?.profileImageId ? " Change" : "Add profile picture"}  
                </Button>
              </span>
            </div>
          </div>

          {/* Profile Form */}
          <form
            className="w-full flex flex-col items-center gap-5"
            onSubmit={handleSubmit(onProfileSubmit)}
          >
            <Input label="Name" {...register("fullName", { required: true })} />
            <Input label="About" {...register("about")} />
            <Input label="Username" {...register("userName")} />
            <Input label="Phone Number" {...register("phoneNumber")} />
            <Input label="Email" {...register("email", { required: true })} />

            <div className="w-full flex justify-end gap-3 mb-3">
              <Button
                className="bg-gray-100 text-black"
                onClick={openResetPopUp}
              >
                Reset
              </Button>
              <Button type="submit" className="bg-red-500 text-white">
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default EditProfile;
