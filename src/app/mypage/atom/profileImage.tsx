import { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import EditLineIcon from "@/public/icons/edit-line.svg";
import { mainfetch } from "@/src/api/apis/mainFetch";
import SaveButton from "./saveButton";

interface ProfileImageProps {
  initialProfileImage: string;
  isSm: boolean;
  isEdit: boolean;
}

const ProfileImage = ({ initialProfileImage, isSm, isEdit }: ProfileImageProps) => {
  const [profileImage, setProfileImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024 * 5) {
        alert("5MB 이하의 파일만 업로드 가능합니다.");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setUploadFile(file);
    }
  };

  const fetchProfileImage = async () => {
    if (!uploadFile) {
      return;
    }
    const formData = new FormData();
    formData.append("image", uploadFile);
    const response = await mainfetch(
      "/members/myinfo/image",
      {
        method: "PATCH",
        body: formData,
      },
      true,
      "multipart/form-data"
    );
    if (!response.ok) {
      alert("프로필 이미지 업로드에 실패했습니다.");
      return;
    }
    const data = await response.json();
    setProfileImage(data.profileImage);
    alert("프로필 이미지 업로드에 성공했습니다.");
  };

  useEffect(() => {
    setProfileImage(initialProfileImage);
  }, [initialProfileImage]);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
          width: {
            xs: "64px",
            sm: "96px",
          },
          height: {
            xs: "64px",
            sm: "96px",
          },
          marginY: "16px",
          position: "relative",
        }}
      >
        <Image
          loader={() => profileImage}
          src={profileImage}
          alt="profile"
          width={isSm ? 64 : 96}
          height={isSm ? 64 : 96}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
        {isEdit && (
          <Box
            sx={{
              position: "absolute",
              bottom: "0px",
              right: "0px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: {
                xs: "21px",
                sm: "32px",
              },
              height: {
                xs: "21px",
                sm: "32px",
              },
              backgroundColor: "white",
              borderRadius: "50%",
              border: "1px solid var(--c-gray2)",
              cursor: "pointer",
            }}
            onClick={handleEditClick}
          >
            <EditLineIcon width={isSm ? 16 : 24} height={isSm ? 16 : 24} />
          </Box>
        )}
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </Box>
      {isEdit && (
        <SaveButton
          handleSave={fetchProfileImage}
          handleCancel={() => setProfileImage(initialProfileImage)}
        />
      )}
    </Box>
  );
};

export default ProfileImage;
