import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useAuth } from "./../../../context/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./Dashboard.css";
import LoaderUI from "../../../components/UI/Loader";
import RecordedEvents from "../../../components/RecordedEvents/RecordedEvents";
import { database } from "./../../../shared/firebase";

const CATEGORIES = [
  {
    id: 1,
    name: "Tournaments",
  },
  {
    id: 2,
    name: "Events",
  },
  {
    id: 3,
    name: "Paramus",
  },
];

const Dashboard = () => {
  const { currentUser, token } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelCategory, setChannelCategory] = useState("");
  const [channels, setChannels] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [events, setEvents] = useState([]);
  const [showRecordedEvents, setShowRecordedEvents] = useState(false);
  const [showChannels, setShowChannels] = useState(true);
  const NUMBER_OF_ITEMS_PER_PAGE = 10;

  const onChangeChannelName = (event) => {
    setChannelName(event.target.value);
  };

  const onChangeCategory = (event) => {
    console.log(event.target.value);
    setChannelCategory(event.target.value);
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setShowModal(true);
    setChannelName("");
  };

  useEffect(() => {
    setShowLoader(true);
    getUserChannels();
  }, []);

  const showToast = (message, flag) => {
    const position = { position: toast.POSITION.TOP_RIGHT };
    switch (flag) {
      case "success":
        toast.success(message, position);
        break;
      case "error":
        toast.error(message, position);
        break;
      default:
        toast.info(message, position);
        break;
    }
  };

  const getAllChannels = () => {
    const url = "https://api.jwplayer.com/v2/sites/3TrTO9d1/channels/";
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization:
          "dQ-pCdfniYN89LsihnFD_WInTWpCVE56bFFSVEptZGtnd1dWVnZSbEZxVTB4Tk9WQlMn",
      },
    };
    axios
      .get(url, options)
      .then((res) => {
        setChannels(res.data.channels);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserChannels = () => {
    const url = `https://api.jwplayer.com/v2/sites/3TrTO9d1/channels`;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization:
          "dQ-pCdfniYN89LsihnFD_WInTWpCVE56bFFSVEptZGtnd1dWVnZSbEZxVTB4Tk9WQlMn",
      },
    };
    axios
      .get(url, options)
      .then((res) => {
        let userEvents = [];
        const allChannels = res.data.channels;
        const userChannels = allChannels.filter(
          (c) =>
            c["metadata"]["custom_params"] &&
            c["metadata"]["custom_params"]["created_by"] === currentUser.uid
        );
        userChannels.forEach((c) => userEvents.push(...c["recent_events"]));
        const completeduserEvents = userEvents.filter(
          (ue) => ue["status"] === "completed"
        );
        setChannels(userChannels);
        setEvents(completeduserEvents);
        setShowLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setShowLoader(false);
      });
  };

  const saveChannel = () => {
    setShowLoader(true);
    const categorySelected = CATEGORIES.find(
      (cat) => cat.id === +channelCategory
    );
    console.log(categorySelected);
    const data = {
      metadata: {
        title: channelName,
        custom_params: {
          created_by: currentUser.uid,
          category: categorySelected.name,
        },
      },
    };
    const url = "https://api.jwplayer.com/v2/sites/3TrTO9d1/channels/";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "dQ-pCdfniYN89LsihnFD_WInTWpCVE56bFFSVEptZGtnd1dWVnZSbEZxVTB4Tk9WQlMn",
      },
    };
    axios
      .post(url, data, options)
      .then((res) => {
        const channelData = res.data;
        setShowModal(false);
        // getAllChannels();
        saveChannelToFirebase(channelData);
        getUserChannels();
        showToast("Channel created scuccessfully", "success");
        setShowLoader(false);
      })
      .catch((err) => {
        setShowLoader(false);
        showToast(
          "There is an error in creating a channel.Please try again.",
          "error"
        );
      });
  };

  const deleteChannelHandler = (channel) => {
    setShowLoader(true);
    const url = `https://api.jwplayer.com/v2/sites/3TrTO9d1/channels/${channel.id}/`;
    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization:
          "dQ-pCdfniYN89LsihnFD_WInTWpCVE56bFFSVEptZGtnd1dWVnZSbEZxVTB4Tk9WQlMn",
      },
    };

    axios
      .delete(url, options)
      .then((res) => {
        console.log(res);
        // getAllChannels();
        deleteChannelFromFirebase(channel);
        getUserChannels();
        showToast("Channel deleted scuccessfully", "error");
        setShowLoader(false);
      })
      .catch((err) => {
        setShowLoader(false);
        showToast(
          "There is an error in creating a channel.Please try again.",
          "error"
        );
      });
  };

  // const getUserChannelsFromFirebase = () => {
  //   const url = `https://all-abilities-live-default-rtdb.firebaseio.com/channels.json`;
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       // Authorization:
  //       //   "dQ-pCdfniYN89LsihnFD_WInTWpCVE56bFFSVEptZGtnd1dWVnZSbEZxVTB4Tk9WQlMn",
  //     },
  //   };
  //   axios
  //     .get(url, options)
  //     .then((res) => {
  //       let userEvents = [];
  //       const allChannels = res.data.channels;
  //       const userChannels = allChannels.filter(
  //         (c) =>
  //           c["metadata"]["custom_params"] &&
  //           c["metadata"]["custom_params"]["created_by"] === currentUser.uid
  //       );
  //       userChannels.forEach((c) => userEvents.push(...c["recent_events"]));
  //       const completeduserEvents = userEvents.filter(
  //         (ue) => ue["status"] === "completed"
  //       );
  //       setChannels(userChannels);
  //       setEvents(completeduserEvents);
  //       setShowLoader(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setShowLoader(false);
  //     });
  // };

  const handleRecordedEvents = () => {
    setShowChannels(false);
    setShowRecordedEvents(true);
  };

  const handleShowChannels = () => {
    setShowChannels(true);
    setShowRecordedEvents(false);
  };

  const saveChannelToFirebase = (channelData) => {
    const categorySelected =
      channelData["metadata"]["custom_params"]["category"];
    console.log(categorySelected);
    axios
      .post(
        `https://all-abilities-live-default-rtdb.firebaseio.com/channels/${categorySelected.toLowerCase()}.json?auth=${token}`,
        channelData
      )
      .then((res) => {
        console.log(res);
      });
  };

  const deleteChannelFromFirebase = async (channel) => {
    console.log(channel, "IN delete");
    const category = channel.metadata.custom_params.category;
    axios
      .get(
        `https://all-abilities-live-default-rtdb.firebaseio.com/channels/${category.toLowerCase()}.json`
      )
      .then((res) => {
        const categoryChannels = res.data;
        console.log(categoryChannels);
        let channelToDeleteKey = null;
        Object.keys(categoryChannels).forEach((key) => {
          if (categoryChannels[key].id === channel.id) {
            channelToDeleteKey = key;
          }
        });
        console.log(channelToDeleteKey);
        execDeleteQuery(category.toLowerCase(), channelToDeleteKey);
      });
  };

  const execDeleteQuery = (category, key) => {
    const ref = database.ref("channels");
    const childRef = ref.child(category);
    childRef
      .child(key)
      .remove()
      .then((res) => {
        console.log(res);
        console.log("Deleted from DB");
      });
  };

  const channelsData = channels.map((channel) => {
    return (
      <div key={channel.id} className="row info-values">
        <div className="col-md-2">{channel.id}</div>
        <div className="col-md-2">{channel.metadata.title}</div>
        <div className="col-md-2">
          {channel.metadata.custom_params.category}
        </div>
        <div className="col-md-6 p-0">
          <div className="row">
            <div className="col-md-10">
              <div className="row p-0">
                <span className="url col-md-12 p-0">
                  rtmps://global-live.mux.com/app
                </span>
                <span className="key col-md-12 mt-1">{channel.stream_key}</span>
              </div>
            </div>
            <div className="col-md-2">
              <i
                className="far fa-trash-alt"
                onClick={() => deleteChannelHandler(channel)}
              ></i>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="admin-dashboard">
      <div className="header">
        <h1 className="section-title">Dashboard</h1>
        <div className="btn-container">
          <button className="btn btn-info mr-5" onClick={handleShowChannels}>
            My Channels
          </button>
          <button
            className="btn btn-warning mr-5"
            onClick={handleRecordedEvents}
          >
            Recorded Events
          </button>
        </div>
      </div>
      {showChannels ? (
        <>
          <div className="main-section">
            <div className="live-channels">
              <div className="channel-header">
                <h5 className="subsection-title">Live Channels</h5>
                <button className="btn btn-dark" onClick={handleShow}>
                  Create Channel
                </button>
              </div>

              {showLoader ? (
                <LoaderUI showLoader={showLoader} />
              ) : channels.length === 0 ? (
                <div className="empty-msg">
                  There are no live channels created.Please click on create
                  channel button to start.
                </div>
              ) : (
                <div className="live-channels-info">
                  <div className="row info-header">
                    <div className="col-md-2">Channel Id</div>
                    <div className="col-md-2">Channel Name</div>
                    <div className="col-md-2">Category</div>
                    <div className="col-md-6">Stream Info</div>
                  </div>
                  {channelsData}
                </div>
              )}
            </div>
          </div>
          <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Create Channel</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={onChangeChannelName}
                  name="channelName"
                  value={channelName}
                  id="channelName"
                  placeholder="Enter channel Name"
                />
              </div>
              <div className="form-group">
                <select
                  className="custom-select"
                  id="category"
                  onChange={onChangeCategory}
                >
                  <option selected>Please select Category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
              <Button variant="dark" onClick={saveChannel}>
                Create
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : null}
      {showRecordedEvents ? (
        <>
          <RecordedEvents recordedEvents={events} />
        </>
      ) : null}
      <ToastContainer transition={Slide} />
    </div>
  );
};

export default Dashboard;
