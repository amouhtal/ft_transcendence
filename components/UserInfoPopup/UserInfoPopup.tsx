import style from "../../styles/addUser.module.css";
import { useState, useRef, useEffect } from "react";
import imagee from "../../public/images/profile.jpg";
import axios from "axios";
import  {useRouter,  withRouter } from "next/router";
import { useDispatch } from "react-redux";
import { update_test } from "../../redux/sizes";
import ErrorType from "../AllError/ErrorType";

const CinFormation = (props: any) => {
  const router = useRouter()
  const [valid, setValid] = useState<number>(0);
  const [image, setImage] = useState<string | undefined>();
  const [userName, setUserName] = useState<string>("");
  const [imageName, changeImageName] = useState<string>("");
  const changeStyle = useRef(null);
  const [userInfo, setUserInfo] = useState<any>({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        localStorage.getItem("accessToken") === null ||
        localStorage.getItem("accessToken") === "undefined" ||
        localStorage.getItem("accessToken") === ""
      )
        axios
          .post(
            `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/users/profile`,
            null,
            {
              headers: {
                Authorization: `Bearer ${
                  localStorage.getItem("accessToken") as string
                }`,
              },
            }
          )
          .then((res) => {
            setUserInfo(res.data.userInfo);
          })
          .catch(function (error) {
            if (error.response) {
              router.push({pathname :`/errorPage/${error.response.status}`})
            }
          });
    }
  }, []);
  const handelChange = (e: any) => {
    let lent: string = e.target.value;
    if (lent.length >= 6 && lent.length <= 15) {
      setValid(1);
      setUserName(e.target.value);
    } else setValid(2);
  };

  function checkimage(src: any) {
    return new Promise((resolve) => {
      const newImage = new Image();
      const typeImage =
        src.search(/data:image\/+/, "") > -1 && src.search(/[;][ -~]+/) > -1
          ? src
              .replace(/[data:image/]+/, "")
              .replace(/[;][ -~]+/, "")
              .toLowerCase()
          : null;
      const base64Data =
        src.search(/^[data:image/]+([jpg]|[png]|[jpeg]|[gif])+[;]/) > -1
          ? src.replace(/^[data:image/]+([jpg]|[png]|[jpeg]|[gif])+[;]/, "")
          : null;
      if (typeImage && base64Data) {
        newImage.src = src;
        newImage.onload = () => resolve(true);
        newImage.onerror = () => resolve(false);
      } else resolve(false);
    });
  }
  // {console.log("====>", image)};
  let putfile = (e: any) => {
    var reader = new FileReader();
    var file = document.querySelector("input[type=file]") as HTMLInputElement;

    reader.onloadend = () => {
      checkimage(reader.result).then((res) => {
        if (res == true) {
          setImage(reader.result?.toString());
        } else {
          alert("Image invalid");
        }
      });
    };
    if (file) {
      let image_: FileList | null = file.files;
      if (image_ && image_.length > 0) {
        if (image_[0].name != undefined) {
          changeImageName(image_[0].name);
          var ext = image_[0].name.split(".").pop();
          if (ext === "png" || ext === "jpg" || ext === "jpeg")
            reader.readAsDataURL(image_[0]);
          else alert("Image type invalid");
        }
      }
    }
  };

  const handelSubmit = (e: any) => {
    e.preventDefault();
    dispatch(update_test());
    const data = { userName, imageName };
    axios
      .post(
        `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/users/complet`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("accessToken") as string
            }`,
          },
        }
      )
      .then((res) => {
        props.setUpdate(!props.update);
        if (
          res.data.message &&
          (res.data.message == "valid username" ||
            res.data.message == "Already have a username")
        ) {
          props.setUpdate(!props.update);
        } else if (res.data.message) alert(res.data.message);
      })
      .catch(function (error) {
        if (error.response) {
          router.push({pathname :`/errorPage/${error.response.status}`})
        }
      });
  };
  return (
    <>
      <div className={style.container}>
        <div className={style.row0}>
          <div className={style.row}>
            <p className={style.text1}>
              The user should be able to upload an avatar. If the user doesn’t
              upload an avatar.
            </p>
          </div>
          <form
            className={style.form}
            onSubmit={(e: any) => {
              e.preventDefault();
            }}
          >
            <div className={style.content}>
              <div className={style.imge}>
                <img
                  className={style.img}
                  src={
                    userInfo?.picture === undefined ? image : userInfo?.picture
                  }
                ></img>
              </div>
              <div className={style.child}>
                <p className={style.text2}>
                  should be able to upload an avatar
                </p>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  onChange={(e) => putfile(e.target)}
                />
                <label htmlFor="file">
                  <div className={style.Btn}>
                    <p className={style.Pavatar}>Chose Avatar</p>
                  </div>
                </label>
              </div>
            </div>
            <div className={style.row1}>
              <p className={style.text3}>Please Add Your UserName</p>
              <div>
                <input
                  ref={changeStyle}
                  className={
                    valid == 1
                      ? style.inptvalid
                      : valid == 2
                      ? style.inptInvalid
                      : style.inpt
                  }
                  placeholder="UserName"
                  onChange={(e) => handelChange(e)}
                ></input>
                {valid == 2 ? (
                  <p className={style.error}>
                    Username Should Be Between 6 and 9 characters
                  </p>
                ) : valid == 1 ? (
                  <p className={style.ValidText}>Successful UserName</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            {valid == 1 && (
              <button className={style.subm} onClick={handelSubmit}>
                Register
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CinFormation;
