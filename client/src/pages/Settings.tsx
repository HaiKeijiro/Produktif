import { ChangeEvent, DragEvent, useState } from "react";
import InputField from "../components/InputField";

interface SettingsProps {
  profilePhoto: string | null;
  setProfilePhoto: (photo: string | null) => void;
}

const Settings: React.FC<SettingsProps> = ({
  profilePhoto,
  setProfilePhoto,
}) => {
  const [dragOver, setDragOver] = useState(false);

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      readImageFile(file);
    }
  };

  const readImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      readImageFile(file);
    }
  };

  return (
    <div className="flex gap-x-10 justify-center mt-10">
      <div className="flex flex-col items-center">
        <div
          className={`w-64 h-64 border-2 border-dashed rounded-full flex items-center justify-center cursor-pointer ${
            dragOver ? "border-blue-400" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="hidden"
            id="fileInput"
          />
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="Uploaded"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <label htmlFor="fileInput" className="text-gray-500 cursor-pointer">
              Drag and drop an image here or click to select a file
            </label>
          )}
        </div>
        {profilePhoto && (
          <button
            onClick={() => setProfilePhoto(null)}
            className="mt-4 bg-accent-failed button"
          >
            Remove Image
          </button>
        )}
      </div>
      <div className="grid w-1/3">
        <form action="" className="my-auto">
          <InputField label="Name" type="text" />
          <InputField label="Email" type="email" required={true} />
          <button type="submit" className="bg-accent-success button">Save</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
