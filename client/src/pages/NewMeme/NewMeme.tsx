import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import axios from "axios";

const NewMeme = () => {
  const userLogin: any = useSelector((state: RootState) => state.userLogin);
  const { error, loading, userInfo }: any = userLogin;

  const [tags, setTags] = useState(["iotameme"]);
  const [file, setFile] = useState({ file: "" });

  console.log(error, loading, userInfo);

  const formSubmitHandler = async (e: any) => {
    e.preventDefault();
    const formData: any = new FormData();
    formData.append("image", file.file);
    formData.append("memeTags", tags);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post("/api/memes", formData, config);

      console.log(data);
    } catch (error) {}
  };

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <input type="text" />
        <input
          type="file"
          name="image"
          id="image"
          onChange={(e: any) =>
            setFile({
              file: e.target.files[0],
            })
          }
          required
        />
        <input type="submit" value="upload" />
      </form>
    </div>
  );
};

export default NewMeme;
