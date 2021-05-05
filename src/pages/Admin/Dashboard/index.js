import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useAuth } from './../../../context/AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './Dashboard.css';
import LoaderUI from '../../../components/UI/Loader';


const Dashboard = () => {
    const { currentUser } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [channelName, setChannelName] = useState("");
    const [channels, setChannels] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const onChangeChannelName = (event) => {
        setChannelName(event.target.value);
    }
    const handleClose = () => setShowModal(false);
    const handleShow = () => {
        setShowModal(true);
        setChannelName('');
    }

    useEffect(() => {
        // getAllChannels();
        setShowLoader(true);
        getUserChannels();
    }, [])


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
        const url = 'https://api.jwplayer.com/v2/sites/3TrTO9d1/channels/';
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: 'dQ-pCdfniYN89LsihnFD_WInTWpCVE56bFFSVEptZGtnd1dWVnZSbEZxVTB4Tk9WQlMn'
            }
        };
        axios.get(url, options).then(res => {
            setChannels(res.data.channels);
        }).catch(err => {
            console.log(err)
        })
    }


    const getUserChannels = () => {
        const url = `https://api.jwplayer.com/v2/sites/3TrTO9d1/channels`;
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: 'dQ-pCdfniYN89LsihnFD_WInTWpCVE56bFFSVEptZGtnd1dWVnZSbEZxVTB4Tk9WQlMn'
            }
        };
        axios.get(url, options).then(res => {
            const allChannels = res.data.channels;
            const userChannels = allChannels.filter(c => c['metadata']['custom_params'] && c['metadata']['custom_params']['created_by'] === currentUser.uid);
            setChannels(userChannels);
            setShowLoader(false);
        }).catch(err => {
            console.log(err);
            setShowLoader(false);
        })
    }

    const saveChannel = () => {
        setShowLoader(true);
        const data = {
            "metadata": {
                "title": channelName,
                "custom_params": {
                    "created_by": currentUser.uid
                }
            }
        }
        const url = 'https://api.jwplayer.com/v2/sites/3TrTO9d1/channels/';
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "dQ-pCdfniYN89LsihnFD_WInTWpCVE56bFFSVEptZGtnd1dWVnZSbEZxVTB4Tk9WQlMn"
            },

        };
        axios.post(url, data, options).then(res => {
            setShowModal(false);
            // getAllChannels();
            getUserChannels();
            showToast("Channel created scuccessfully", "success");
            setShowLoader(false);
        }).catch(err => {
            setShowLoader(false);
            showToast("There is an error in creating a channel.Please try again.", "error");
        })
    }

    const deleteChannelHandler = (channelId) => {
        setShowLoader(true);
        const url = `https://api.jwplayer.com/v2/sites/3TrTO9d1/channels/${channelId}/`;
        const options = {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                Authorization: 'dQ-pCdfniYN89LsihnFD_WInTWpCVE56bFFSVEptZGtnd1dWVnZSbEZxVTB4Tk9WQlMn'
            }
        };

        axios.delete(url, options).then((res) => {
            console.log(res);
            // getAllChannels();
            getUserChannels();
            showToast("Channel deleted scuccessfully", "error");
            setShowLoader(false);
        }).catch(err => {
            setShowLoader(false);
            showToast("There is an error in creating a channel.Please try again.", "error");
        })
    }

    const channelsData = channels.map(channel => {
        return (<div className="row info-values">
            <div className="col-md-2">
                {channel.id}
            </div>
            <div className="col-md-2">
                {channel.metadata.title}
            </div>
            <div className="col-md-8">
                <div className="row">
                    <span className="url col-md-5">rtmps://global-live.mux.com/app</span>
                    <span className="key col-md-6">{channel.stream_key}</span>
                    <span className="col-md-1"><i class="far fa-trash-alt" onClick={() => deleteChannelHandler(channel.id)}></i></span>
                </div>
            </div>

        </div>)
    })
    return (
        <div className="admin-dashboard">
            <div className="header">
                <h1 className="section-title">Dashboard</h1>
                <button className="btn btn-dark" onClick={handleShow}>Create Channel</button>
            </div>
            <ToastContainer transition={Slide} />
            <div className="main-section">
                <div className="live-channels">
                    <h5 className="subsection-title">Live Channels</h5>
                    {showLoader ?
                        (<LoaderUI showLoader={showLoader} />) :
                        channels.length === 0 ? <div className="empty-msg">There are no live channels created.Please click on create channel button to start.</div> : (<div className="live-channels-info">
                            <div className="row info-header">
                                <div className="col-md-2">
                                    Channel Id
                            </div>
                                <div className="col-md-2">
                                    Channel Name
                            </div>
                                <div className="col-md-8">
                                    Stream Info
                            </div>
                            </div>
                            {channelsData}
                        </div>)
                    }


                </div>
                {/* <div className="usage">
                    <h5 className="subsection-title">Usage</h5>
                    <div className="usage-info row">
                        <div className="storage col-md-3">
                            <div className="row">
                                <div className="col-md-12 label">Storage</div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 value">217GB</div>
                            </div>
                        </div>
                        <div className="storage col-md-3">
                            <div className="row">
                                <div className="col-md-12 label">Streaming Data</div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 value">14.6GB</div>
                            </div>
                        </div>
                        <div className="storage col-md-3">
                            <div className="row">
                                <div className="col-md-12 label">Playbacks</div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 value">4000</div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create Channel</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="form-group">
                        <input type="text" className="form-control" onChange={onChangeChannelName} name="channelName" value={channelName} id="channelName" placeholder="Enter channel Name" />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>Close</Button>
                    <Button variant="dark" onClick={saveChannel}>Create</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Dashboard
