import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Photos from "../components/Photos";
import PerksLabels from "../perks/PerksLabels";
import { StoreContext } from "../contextapi/contextapi";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Account from "../pages/Account";

const Placeform = () => {
  const { url } = useContext(StoreContext);
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(1000);
  const [redirect, setRedirect] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchPlaceData = async () => {
      try {
        const response = await axios.get(url + "/api/places/" + id, {
          withCredentials: true,
        });

        const {
          title = "",
          address = "",
          addedPhotos = [],
          description = "",
          perks = [],
          extraInfo = "",
          checkIn = "",
          checkOut = "",
          maxGuests = 1,
          price,
        } = response.data;

        setTitle(title);
        setAddress(address);
        setAddedPhotos(addedPhotos);
        setDescription(description);
        setPerks(perks);
        setExtraInfo(extraInfo);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setMaxGuests(maxGuests);
        setPrice(price);
      } catch (error) {
        toast.error("Failed to fetch place data");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceData();
  }, [id, url]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (addedPhotos.length < 5) {
      toast.error("Please upload at least 5 photos.");
      return;
    }

    const endpoint = id ? `/api/places/${id}` : "/api/places";
    const method = id ? "put" : "post";

    try {
      await axios[method](
        url + endpoint,
        {
          title,
          address,
          addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        },
        { withCredentials: true }
      );
      setRedirect("/account/places");
      toast.success(id ? "Place updated successfully" : "Place added successfully");
    } catch (error) {
      toast.error("Failed to save place data");
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Account />
      <form onSubmit={handleSubmit} className="lg:px-20">
        <InputSection
          title="Title"
          description="A catchy title for your place"
        >
          <input
            type="text"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="E.g. Cozy Apartment"
            required
          />
        </InputSection>

        <InputSection title="Address" description="Address of the place">
          <input
            type="text"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
            placeholder="123 Main St"
            required
          />
        </InputSection>

        <InputSection title="Photos" description="Upload at least 5 photos">
          <Photos addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />
        </InputSection>

        <InputSection title="Description" description="Describe your place">
          <textarea
            value={description}
            maxLength={200}
            placeholder="Short description"
            onChange={(ev) => setDescription(ev.target.value)}
          />
        </InputSection>

        <InputSection title="Perks" description="Select all perks available">
          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            <PerksLabels selected={perks} onChange={setPerks} />
          </div>
        </InputSection>

        <InputSection title="Extra Info" description="House rules, etc.">
          <textarea
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
            maxLength={100}
            placeholder="E.g. No smoking inside"
          />
        </InputSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <InputTimeSection
            title="Check-in Time"
            value={checkIn}
            onChange={(ev) => setCheckIn(ev.target.value)}
            placeholder="14:00"
          />

          <InputTimeSection
            title="Check-out Time"
            value={checkOut}
            onChange={(ev) => setCheckOut(ev.target.value)}
            placeholder="11:00"
          />

          <InputNumberSection
            title="Max Guests"
            value={maxGuests}
            onChange={(ev) => setMaxGuests(Math.max(1, Number(ev.target.value)))}
            min={1}
          />

          <InputNumberSection
            title="Price per Night"
            value={price}
            onChange={(ev) => setPrice(Number(ev.target.value))}
            placeholder="1000"
            min={1000}
            error={price < 1000 ? "Price must be at least 1000" : ""}
          />
        </div>

        <button type="submit" className="primary my-4" disabled={price < 1000}>
          Save
        </button>
      </form>
    </div>
  );
};

// Reusable Input Section
const InputSection = ({ title, description, children }) => (
  <div className="mt-4">
    <h2 className="text-2xl">{title}</h2>
    <p className="text-gray-500 text-sm">{description}</p>
    {children}
  </div>
);

// Time and Number Input Sections
const InputTimeSection = ({ title, value, onChange, placeholder }) => (
  <div>
    <h3 className="mt-2 -mb-1">{title}</h3>
    <input type="text" value={value} onChange={onChange} placeholder={placeholder} />
  </div>
);

const InputNumberSection = ({ title, value, onChange, placeholder, min, error }) => (
  <div>
    <h3 className="mt-2 -mb-1">{title}</h3>
    <input
      type="number"
      value={value}
      onChange={onChange}
      min={min}
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 mt-1">{error}</p>}
  </div>
);

export default Placeform;
