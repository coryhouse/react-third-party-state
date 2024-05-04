import { useState } from "react";
import { saveShippingAddress } from "./services/shippingService";
import { useCart } from "./cartContext";
import { ShippingAddress } from "./types/types";

const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED",
};

// Declaring outside component to avoid recreation on each render
const emptyAddress: ShippingAddress = {
  city: "",
  country: "",
};

const initialTouched = {
  city: false,
  country: false,
};

type Errors = {
  city?: string;
  country?: string;
};

export default function Checkout() {
  const { dispatch } = useCart();
  const [address, setAddress] = useState(emptyAddress);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [saveError, setSaveError] = useState<Error | null>(null);
  const [touched, setTouched] = useState(initialTouched);

  // Derived state
  const errors = getErrors(address);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    e.persist(); // persist the event
    setAddress((curAddress) => {
      return {
        ...curAddress,
        [e.target.id]: e.target.value,
      };
    });
  }

  function handleBlur(
    event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    event.persist();
    setTouched((cur) => {
      return { ...cur, [event.target.id]: true };
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if (isValid) {
      try {
        await saveShippingAddress(address);
        dispatch({ type: "empty" });
        setStatus(STATUS.COMPLETED);
      } catch (e) {
        setSaveError(e as Error);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }

  function getErrors(address: ShippingAddress) {
    const errors: Errors = {};
    if (!address.city) errors.city = "City is required";
    if (!address.country) errors.country = "Country is required";
    return errors;
  }

  if (saveError) throw saveError;
  if (status === STATUS.COMPLETED) {
    return <h1>Thanks for shopping!</h1>;
  }

  return (
    <>
      <h1>Shipping Info</h1>
      {!isValid && status === STATUS.SUBMITTED && (
        <div role="alert">
          <p>Please fix the following errors:</p>
          <ul>
            {Object.keys(errors).map((key) => {
              return <li key={key}>{errors[key as keyof typeof errors]}</li>;
            })}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <br />
          <input
            id="city"
            type="text"
            value={address.city}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <p role="alert">
            {(touched.city || status === STATUS.SUBMITTED) && errors.city}
          </p>
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select
            id="country"
            value={address.country}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="USA">USA</option>
          </select>

          <p role="alert">
            {(touched.country || status === STATUS.SUBMITTED) && errors.country}
          </p>
        </div>

        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info"
            disabled={status === STATUS.SUBMITTING}
          />
        </div>
      </form>
    </>
  );
}
