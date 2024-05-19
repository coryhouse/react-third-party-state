import { useState } from "react";
import { saveShippingAddress } from "./services/shippingService";
import { useCart } from "./context/cartContext";
import { ShippingAddress } from "./types/types";

type Status = "Idle" | "Submitted" | "Submitting" | "Completed";

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
  const { setCart } = useCart();
  const [address, setAddress] = useState(emptyAddress);
  const [status, setStatus] = useState<Status>("Idle");
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
    setStatus("Submitting");
    if (isValid) {
      try {
        await saveShippingAddress(address);
        setCart([]);
        setStatus("Completed");
      } catch (e) {
        setSaveError(e as Error);
      }
    } else {
      setStatus("Submitted");
    }
  }

  function getErrors(address: ShippingAddress) {
    const errors: Errors = {};
    if (!address.city) errors.city = "City is required";
    if (!address.country) errors.country = "Country is required";
    return errors;
  }

  if (saveError) throw saveError;
  if (status === "Completed") {
    return <h1>Thanks for shopping!</h1>;
  }

  return (
    <>
      <h1>Shipping Info</h1>
      {!isValid && status === "Submitted" && (
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
            {(touched.city || status === "Submitted") && errors.city}
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
            {(touched.country || status === "Submitted") && errors.country}
          </p>
        </div>

        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info"
            disabled={status === "Submitting"}
          />
        </div>
      </form>
    </>
  );
}
