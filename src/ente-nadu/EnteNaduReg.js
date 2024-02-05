import React, { useState } from "react";
import { dataRef, storage } from "../Firebase";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import "./style.css";

function EnteNaduReg() {
  const [profileImage, setProfileImage] = useState("/ente-nadu/def_pfp.jpg");
  const [documentFile, setDocumentFile] = useState(null);
  const [isFirmSelected, setIsFirmSelected] = useState(false);
  const [isStudentOfVHSS, setIsStudentOfVHSS] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setIsFirmSelected(!isFirmSelected);
  };
  const handleStudentCheckboxChange = () => {
    setIsStudentOfVHSS(!isStudentOfVHSS);
  };

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("Error compressing image:", error);
      throw error;
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.type.startsWith("image/")) {
        const fileSizeInKB = file.size / 1024;


        if (fileSizeInKB <= 750) {
          const reader = new FileReader();
          reader.onload = async (e) => {
            const dataUrl = e.target.result;
            setProfileImage(dataUrl);
          };
          reader.readAsDataURL(file);
        } else {
          try {

            const compressedImage = await compressImage(file);

            const compressedFileSizeInKB = compressedImage.size / 1024;
            if (compressedFileSizeInKB <= 750) {
              const reader = new FileReader();
              reader.onload = async (e) => {
                const dataUrl = e.target.result;
                setProfileImage(dataUrl);
              };
              reader.readAsDataURL(compressedImage);
            } else {
              alert(
                "Compressed image size exceeds the limit of 750 KB. Please select a smaller image."
              );
              event.target.value = null;
            }
          } catch (error) {
            console.error("Error handling image upload:", error);
            alert(
              "Error compressing image. Please try again with a different image."
            );
            event.target.value = null;
          }
        }
      } else {
        alert(
          "Invalid file type. Please select a valid image file for the profile picture."
        );
        event.target.value = null;
      }
    }
  };

  const handleDocumentUpload = async (event) => {
    const file = event.target.files[0];
  
    if (file) {
      if (file.type.startsWith("image/") || file.type === "application/pdf") {
        try {

          const compressedFile = file.type.startsWith("image/")
            ? await compressImage(file)
            : file;

          if (compressedFile.size / (1024 * 1024) <= 2) {
            setDocumentFile(compressedFile);
          } else {
            alert("File size exceeds the limit of 2 MB. Please select a smaller file.");
            event.target.value = null;
          }
        } catch (error) {
          console.error("Error handling document upload:", error);
          alert("Error handling document upload. Please try again with a different file.");
          event.target.value = null;
        }
      } else {

        alert("Invalid file type. Please select a valid PDF or image file for the document.");
        event.target.value = null;
      }
    }
  };
  

  const openFileInput = () => {
    document.getElementById("imageUpload").click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      address: document.getElementById("address").value,
      pincode: document.getElementById("pincode").value,
      dob: document.getElementById("dob").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      aadhaarNo: document.getElementById("aadhaarNo").value,
      educationQualification: document.getElementById("eduQualification").value,
      skillSector: document.getElementById("skillSector").value,
      bloodGroup: document.getElementById("bloodGroup").value,
      experience: document.getElementById("experience").value,
      isStudent: document.getElementById("studentOfVHSSCheckbox").checked,
      StudentId: document.getElementById("studentID").value,
      runFirm: document.getElementById("runFirmCheckbox").checked,
      nameOfFirm: document.getElementById("nameOfFirm").value,
      addressOfFirm: document.getElementById("addressOfFirm").value,
      phoneOfFirm: document.getElementById("phoneOfFirm").value,
      placeOfFirm: document.getElementById("placeOfFirm").value,
      municipality_panchayath: document.getElementById(
        "municipality_panchayath"
      ).value,
      wardNo: document.getElementById("wardNo").value,
      place: document.getElementById("place").value,
      landMark: document.getElementById("landMark").value,
    };

    const pincodeInput = document.getElementById("pincode");
    const pincodeValue = pincodeInput.value;


    if (pincodeValue.length !== 6) {
      var errorMessage = "Pincode must be of 6 digits\n";
    }

    const phoneInput = document.getElementById("phone");
    const phoneValue = phoneInput.value;


    if (phoneValue.length !== 10) {
      errorMessage =
        (errorMessage || "") + "Phone number must be of 10 digits\n";
    }

    const aadhaarInput = document.getElementById("aadhaarNo");
    const aadhaarValue = aadhaarInput.value;

    if (aadhaarValue.length !== 12) {
      errorMessage =
        (errorMessage || "") + "Aadhaar number must be of 12 digits\n";
    }

    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    const userID = formData.email.split("@")[0] + formData.phone;


    if (profileImage !== "/ente-nadu/def_pfp.jpg") {
      const profileImageRef = storage.child(`profile_images/${userID}`);
      profileImageRef.putString(profileImage, "data_url").then(() => {
        console.log("Profile image uploaded successfully!");
      });
    } else {
      alert("Please select a profile image");
    }


    if (documentFile) {
      const documentRef = storage.child(`documents/aadhaar/${userID}`);
      documentRef.put(documentFile).then(() => {
        console.log("Aadhaar uploaded successfully!");
      });
    }

    dataRef.ref(`registrations/${userID}`).set(formData);
    console.log("Form data pushed");
    alert("Registration Successful!");
    navigate("/");
  };

  return (
    <div className="form-container">
    
      <div className="registration-container">
        <div className="en-page-header">
          <div className="form-row">
            <div className="form-group col-md-12">
              <img src="/logo.png" alt="" className="en-page-header-logo" />
            </div>
            <div className="form-group col-md-0 ">
              <div
                id="profile-container"
                onClick={openFileInput}
                style={{ cursor: "pointer",}}
              >
                <img
                  id="profileImage"
                  src={profileImage}
                  className="en-profile-image"
                  alt="Profile"
                />
              </div>
              <input
                id="imageUpload"
                type="file"
                name="profile_photo"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <div className="mt-1">
                <small style={{ color: "red" }}>
                  *File size should be less than 750 KB.
                </small>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control custom-input"
              id="name"
              placeholder="Name"
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control custom-input"
              id="address"
              placeholder="Address"
              required
            />
          </div>

          <div className="form-row">
            <div
              className="form-group col-md-6"
              style={{ marginBottom: "15px" }}
            >
              <label htmlFor="inputZip">Pincode</label>
              <input
                type="tel"
                className="form-control"
                id="pincode"
                placeholder="Pincode"
                pattern="[0-9]+"
                required
              />
            </div>
            <div
              className="form-group col-md-6"
              style={{ marginBottom: "15px" }}
            >
              <label htmlFor="dob">Date of Birth</label>
              <input type="date" className="form-control" id="dob" required />
            </div>
          </div>

          <div className="form-row">
            <div
              className="form-group col-md-6"
              style={{ marginBottom: "15px" }}
            >
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                placeholder="Phone"
                pattern="[0-9]+"
                required
              />
            </div>
            <div
              className="form-group col-md-6"
              style={{ marginBottom: "15px" }}
            >
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group col-md-6" style={{ marginBottom: "15px" }}>
  <label htmlFor="password">Password</label>
  <div className="input-group">
    <input
      type={showPassword ? "text" : "password"}
      className="form-control"
      id="password"
      placeholder="Password"
      required
    />
    <div className="input-group-append">
      <div
        className="input-group-text"
        style={{ cursor: "pointer" }}
        onClick={() => setShowPassword(!showPassword)}
      >
        <i
  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
  style={{ fontSize: "1em", lineHeight: "1.5em" }} 
></i>
      </div>
    </div>
  </div>
</div>

          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label htmlFor="aadhaarNo">Aadhaar No</label>
            <input
              type="tel"
              className="form-control custom-input"
              id="aadhaarNo"
              placeholder="Aadhaar No"
              pattern="[0-9]+"
              required
            />
          </div>

          <div className="form-row">
            <div
              className="form-group col-md-6"
              style={{ marginBottom: "15px" }}
            >
              <label htmlFor="eduQualification">Education Qualification</label>
              <select id="eduQualification" className="form-control" required>
                <option value="">Choose...</option>
                <option>Below 10</option>
                <option>10</option>
                <option>+2</option>
                <option>ITI/ITC</option>
                <option>Deploma</option>
                <option>Engineering</option>
                <option>Degree</option>
                <option>PG</option>
                <option>Others</option>
              </select>
            </div>
            <div
              className="form-group col-md-6"
              style={{ marginBottom: "15px" }}
            >
              <label htmlFor="skillSector">Skill Sector</label>
              <select id="skillSector" className="form-control" required>
                <option value="">Choose...</option>
                <option>Electrician</option>
                <option>Plumber</option>
                <option>Construction</option>
                <option>Electrical Appliances Service</option>
                <option>Two-Wheeler</option>
                <option>Three-Wheeler</option>
                <option>Car</option>
                <option>Other Auto Mobiles</option>
                <option>Ac / Fridge</option>
                <option>Tv And Electronics</option>
                <option>Well</option>
                <option>Wood Work</option>
                <option>Kooli Pani</option>
                <option>Coconut Climbing</option>
                <option>CCTV</option>
                <option>Computer</option>
                <option>Mobile</option>
                <option>Aluminium</option>
                <option>Tile</option>
                <option>Welding</option>
                <option>Others</option>
              </select>
            </div>
            <div
              className="form-group col-md-6"
              style={{ marginBottom: "15px" }}
            >
              <label htmlFor="bloodGroup">Blood Group</label>
              <select id="bloodGroup" className="form-control" required>
                <option value="">Choose...</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label htmlFor="experience">Experience</label>
            <input
              type="text"
              className="form-control custom-input"
              id="experience"
              placeholder="Experience"
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: "15px" }}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="studentOfVHSSCheckbox"
              value="0"
              onChange={handleStudentCheckboxChange}
              checked={isStudentOfVHSS}
            />
            <label className="form-check-label" htmlFor="studentOfVHSSCheckbox">
              Are you a student of VHSS Aryampadam?
            </label>
          </div>
        </div>
        <div
          id="studentFields"
          style={{ display: isStudentOfVHSS ? "block" : "none" }}
        >
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label htmlFor="studentID">Student ID</label>
            <input
              type="text"
              className="form-control"
              id="studentID"
              placeholder="Student ID"
              required={isStudentOfVHSS}
            />
          </div>
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="runFirmCheckbox"
                value="0"
                onChange={handleCheckboxChange}
                checked={isFirmSelected}
              />
              <label className="form-check-label" htmlFor="runFirmCheckbox">
                Run a Firm
              </label>
            </div>
          </div>

          <div
            id="runFirmCheckboxdiv"
            style={{ display: isFirmSelected ? "block" : "none" }}
          >
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label htmlFor="nameOfFirm">Name of Firm</label>
              <input
                type="text"
                className="form-control"
                id="nameOfFirm"
                placeholder="Name of Firm"
                required={isFirmSelected}
              />
            </div>

            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label htmlFor="addressOfFirm">Address</label>
              <input
                type="text"
                className="form-control"
                id="addressOfFirm"
                placeholder="Address"
                required={isFirmSelected}
              />
            </div>

            <div className="form-row">
              <div
                className="form-group col-md-6"
                style={{ marginBottom: "15px" }}
              >
                <label htmlFor="phoneOfFirm">Phone</label>
                <input
                  type="number"
                  className="form-control"
                  id="phoneOfFirm"
                  placeholder="Phone"
                  required={isFirmSelected}
                />
              </div>
              <div
                className="form-group col-md-6"
                style={{ marginBottom: "15px" }}
              >
                <label htmlFor="placeOfFirm">Place</label>
                <input
                  type="text"
                  className="form-control"
                  id="placeOfFirm"
                  placeholder="Place"
                  required={isFirmSelected}
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div
              className="form-group col-md-6"
              style={{ marginBottom: "15px" }}
            >
              <label htmlFor="municipality_panchayath">
                Municipality/Panchayath
              </label>
              <input
                type="text"
                className="form-control"
                id="municipality_panchayath"
                placeholder="Municipality/Panchayath"
                required
              />
            </div>
            <div
              className="form-group col-md-6"
              style={{ marginBottom: "15px" }}
            >
              <label htmlFor="wardNo">Ward No</label>
              <input
                type="tel"
                className="form-control"
                id="wardNo"
                placeholder="Ward No"
                pattern="[0-9]+"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div
              className="form-group col-md-6"
              style={{ marginBottom: "15px" }}
            >
              <label htmlFor="place">Place</label>
              <input
                type="text"
                className="form-control"
                id="place"
                placeholder="Place"
                required
              />
            </div>
            <div
              className="form-group col-md-6"
              style={{ marginBottom: "15px" }}
            >
              <label htmlFor="landMark">Land Mark</label>
              <input
                type="text"
                className="form-control"
                id="landMark"
                placeholder="Land Mark"
                required
              />
            </div>
          </div>

          <div className="form-group en-upload-file">
            <label htmlFor="upload_aadhaar">Upload Aadhaar</label>
            <input
              type="file"
              id="documentUpload"
              name="document"
              onChange={handleDocumentUpload}
              required
            />
            <div className="mt-1">
              <small style={{ color: "red" }}>
                *File size should be less than 2 MB.
              </small>
            </div>
          </div>

          <div className="en-page-action">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>

        <div className="en-page-footer">
          <span>
            Powered by <b>Sarvodayam VHSS</b>
          </span>
        </div>
      </div>
    </div>
   
    
    
  );
}

export default EnteNaduReg;
