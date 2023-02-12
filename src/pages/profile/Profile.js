import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { getUser } from "../../services/authService";
import { SET_USER, SET_NAME } from "../../redux/features/auth/authSlice";
import "./Profile.scss";
import { Spinner } from "../../components/loader/Loader";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";

export default function Profile() {
  useRedirectLoggedOutUser("/login");

  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getUserData() {
      const data = await getUser();
      //   console.log(data);
      setProfile(data);
      setLoading(false);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
    }
    getUserData();
  }, [dispatch]);

  return (
    <div className="profile --py2">
      {loading && <Spinner />}
      <>
        {!loading && profile === null ? (
          <p>Something went wrong. Please, reload the page!</p>
        ) : (
          <Card cardClass={"card --flex-dir-column"}>
            <span className="profile-photo">
              <img src={profile?.photo} alt="photo" />
            </span>
            <span className="profile-data">
              <p>
                <b>Name: </b>
                {profile?.name}
              </p>
              <p>
                <b>Email: </b>
                {profile?.email}
              </p>
              <p>
                <b>Phone: </b>
                {profile?.phone}
              </p>
              <p>
                <b>Bio: </b>
                {profile?.bio}
              </p>
              <div>
                <Link to="/edit-profile">
                  <button className="--btn --btn-primary">Edit Profile</button>
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  );
}
