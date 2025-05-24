import { Icon } from "leaflet"

export const fireIcon = new Icon({
    iconUrl: require("../images/fire.png"),
    iconSize: [45, 45]
});

export const floodingIcon = new Icon({
  iconUrl: require("../images/flooding.png"),
  iconSize: [45, 45]
});

export const earthquakeIcon = new Icon({
  iconUrl: require("../images/earthquake.png"),
  iconSize: [45, 45]
});
  
export const myProfileIcon = require("../images/myprofile.png");

export const eventTitleBackground = require("../images/event-title-background.png");

export const eventDescriptionDate = require("../images/event-description-date.png")

export const eventDescriptionLocation = require("../images/event-description-location.png");

export const redPdf = require("../images/red-pdf.png");

export const adminIcon = require("../images/adminIcon.png");

export const roleOptions = ["volunteer", "organization", "admin"] as const;

export const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";