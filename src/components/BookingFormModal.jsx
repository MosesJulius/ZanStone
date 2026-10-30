import emailjs from "emailjs-com";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaCalendarAlt, FaChild, FaEnvelope, FaGlobe, FaMapMarkedAlt, FaTimes, FaUser, FaUsers } from "react-icons/fa";
import styled from "styled-components";

// -----------------------------------------------------
// STYLES
// -----------------------------------------------------

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 123, 255, 0.4), rgba(0, 184, 148, 0.4));
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
`;

const Modal = styled(motion.div)`
  width: 500px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95));
  padding: 40px 35px;
  border-radius: 25px;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 520px) {
    width: 90%;
    max-width: 90vw;
    padding: 30px 25px;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #333;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 25px;
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e3a8a;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &::before {
    content: "🌍";
    font-size: 1.5rem;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const Icon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  font-size: 16px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  margin-bottom: 5px;
  display: block;
  font-weight: 600;
  color: #374151;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 14px 14px 40px;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  background: #f8fafc;
  transition: all 0.3s ease;
  font-size: 14px;

  &:focus {
    border-color: #3b82f6;
    background: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    outline: none;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 14px 14px 14px 40px;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  background: #f8fafc;
  transition: all 0.3s ease;
  font-size: 14px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 12px center;
  background-repeat: no-repeat;
  background-size: 16px;

  &:focus {
    border-color: #3b82f6;
    background: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    outline: none;
  }
`;

const FullWidth = styled.div`
  grid-column: 1 / -1;
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4);
  }
`;

const TermsRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 18px;
  padding: 13px 15px;
  border-radius: 12px;
  background: rgba(59, 130, 246, 0.06);
  border: 1px solid rgba(59, 130, 246, 0.22);
  font-size: 0.88rem;
  color: #374151;
  line-height: 1.5;

  input {
    margin-top: 3px;
    width: 18px;
    height: 18px;
    accent-color: #1d4ed8;
    cursor: pointer;
    flex-shrink: 0;
  }

  label {
    cursor: pointer;
  }

  a {
    color: #1d4ed8;
    font-weight: 700;
    text-decoration: underline;
  }
`;

const TermsError = styled.p`
  margin: 8px 2px 0;
  color: #dc2626;
  font-size: 0.83rem;
  font-weight: 600;
`;

// ✅ Success Animation Container - FIXED for perfect centering
const SuccessOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4000;
  padding: 20px;
`;

const SuccessPopup = styled(motion.div)`
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.98));
  padding: 35px 30px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2);
  text-align: center;
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.3);

  /* Mobile responsiveness */
  @media (max-width: 480px) {
    max-width: 300px;
    padding: 30px 25px;
    margin: 0 auto;
  }
`;

const CheckMark = styled(motion.div)`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px auto;
  color: white;
  font-size: 2.5rem;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);

  @media (max-width: 480px) {
    width: 65px;
    height: 65px;
    font-size: 2.1rem;
  }
`;

// -----------------------------------------------------
// COMPONENT
// -----------------------------------------------------

const BookingFormModal = ({ open, onClose }) => {
  const [success, setSuccess] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [termsError, setTermsError] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    arrivalDate: "",
    departureDate: "",
    adults: "",
    children: "",
    tourType: "",
  });

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const sendEmail = () => {
    if (!agreed) {
      setTermsError(true);
      return;
    }

    emailjs.send(
      "service_bt3me1c",   // <-- Replace
      "template_zay2l3n",    // <-- Replace
      {
        to_email: "zanstonetoursandsafaris@gmail.com",
        ...form,
        termsAccepted: "Yes",
      },
      "_SwJMh2T_pbkd6wMJ"   // <-- Replace
    );

    // ✅ show success animation
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1800);
  };

  if (!open) return null;

  return (
    <>
      {/* ✅ SUCCESS POPUP - FIXED CENTERING */}
      <AnimatePresence>
        {success && (
          <SuccessOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SuccessPopup
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <CheckMark
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
              >
                ✓
              </CheckMark>

              <h3 style={{ margin: 0, color: "#1d4ed8", fontSize: "1.5rem", fontWeight: "700" }}>Booking Request Sent!</h3>
              <p style={{ color: "#374151", fontSize: "1rem", marginTop: 10, marginBottom: 0, fontWeight: "500" }}>
                We'll get back to you with your personalized safari itinerary soon!
              </p>
            </SuccessPopup>
          </SuccessOverlay>
        )}
      </AnimatePresence>

      {/* ✅ MAIN BOOKING MODAL */}
      <AnimatePresence>
        {open && !success && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <Modal
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </CloseButton>

              <Title>Book Your Safari Adventure</Title>

              <FormGrid
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                <InputWrapper
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Label>Full Name</Label>
                  <Icon><FaUser /></Icon>
                  <Input placeholder="John Doe" onChange={(e) => update("name", e.target.value)} />
                </InputWrapper>

                <InputWrapper
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Label>Email Address</Label>
                  <Icon><FaEnvelope /></Icon>
                  <Input type="email" placeholder="email@example.com" onChange={(e) => update("email", e.target.value)} />
                </InputWrapper>

                <InputWrapper
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Label>Country</Label>
                  <Icon><FaGlobe /></Icon>
                  <Input placeholder="Your Country" onChange={(e) => update("country", e.target.value)} />
                </InputWrapper>

                <InputWrapper
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Label>Arrival Date</Label>
                  <Icon><FaCalendarAlt /></Icon>
                  <Input type="date" onChange={(e) => update("arrivalDate", e.target.value)} />
                </InputWrapper>

                <InputWrapper
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Label>Departure Date</Label>
                  <Icon><FaCalendarAlt /></Icon>
                  <Input type="date" onChange={(e) => update("departureDate", e.target.value)} />
                </InputWrapper>

                <InputWrapper
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Label>No. of Adults</Label>
                  <Icon><FaUsers /></Icon>
                  <Input type="number" placeholder="0" onChange={(e) => update("adults", e.target.value)} />
                </InputWrapper>

                <InputWrapper
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Label>No. of Children</Label>
                  <Icon><FaChild /></Icon>
                  <Input type="number" placeholder="0" onChange={(e) => update("children", e.target.value)} />
                </InputWrapper>

                <FullWidth>
                  <InputWrapper
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Label>Tour Type</Label>
                    <Icon><FaMapMarkedAlt /></Icon>
                    <Select onChange={(e) => update("tourType", e.target.value)}>
                      <option value="" selected>Select Tour Type</option>
                      <option value="2-Day Nyerere National Park (Selous) Safari from Zanzibar">2-Day Nyerere National Park (Selous) Safari from Zanzibar</option>
                      <option value="4-Day Serengeti Fly-in Safari with Hot-Air Balloon">4-Day Serengeti Fly-in Safari with Hot-Air Balloon</option>
                      <option value="3-Day Mikumi National Park Safari from Zanzibar">3-Day Mikumi National Park Safari from Zanzibar</option>
                      <option value="2-Day Ngorongoro Safari from Zanzibar">2-Day Ngorongoro Safari from Zanzibar</option>
                      <option value="3-Day Serengeti Safari from Zanzibar">3-Day Serengeti Safari from Zanzibar</option>
                      <option value="Mikumi National Park Day Safari from Zanzibar">Mikumi National Park Day Safari from Zanzibar</option>
                      <option value="Nyerere National Park (Selous) Day Safari from Zanzibar">Nyerere National Park (Selous) Day Safari from Zanzibar</option>
                      <option value="5-Day Serengeti, Ngorongoro & Tarangire Safari from Zanzibar">5-Day Serengeti, Ngorongoro & Tarangire Safari from Zanzibar</option>
                      <option value="3-Day Tarangire & Ngorongoro Safari from Zanzibar">3-Day Tarangire & Ngorongoro Safari from Zanzibar</option>
                      <option value="8-Day Zanzibar & Mikumi Safari Experience">8-Day Zanzibar & Mikumi Safari Experience</option>
                      <option value="Kendwa Sunset Dhow Cruise">Kendwa Sunset Dhow Cruise</option>
                      <option value="Stone Town & Spice Farm Private Tour">Stone Town & Spice Farm Private Tour</option>
                      <option value="Stone Town & Prison Island Private Tour">Stone Town & Prison Island Private Tour</option>
                      <option value="Salaam Cave & Maalum Cave Private Tour">Salaam Cave & Maalum Cave Private Tour</option>
                      <option value="Jozani Forest & Salaam Cave Turtle Experience">Jozani Forest & Salaam Cave Turtle Experience</option>
                      <option value="Swim with Sea Turtles at Salaam Cave">Swim with Sea Turtles at Salaam Cave</option>
                      <option value="Private Safari Blue Experience">Private Safari Blue Experience</option>
                      <option value="Private Pungume Sandbank & Snorkeling Experience">Private Pungume Sandbank & Snorkeling Experience</option>
                      <option value="Private Nyange Sandbank Experience">Private Nyange Sandbank Experience</option>
                      <option value="Nakupenda Sandbank Experience">Nakupenda Sandbank Experience</option>
                      <option value="Nakupenda Sandbank & Prison Island Private Tour">Nakupenda Sandbank & Prison Island Private Tour</option>
                      <option value="Mnemba Island Snorkeling Experience">Mnemba Island Snorkeling Experience</option>
                      <option value="Clear Kayak, Drone, Jet Ski & Jet Car Experience">Clear Kayak, Drone, Jet Ski & Jet Car Experience</option>
                    </Select>
                  </InputWrapper>
                </FullWidth>
              </FormGrid>

              <TermsRow>
                <input
                  id="booking-terms"
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => {
                    setAgreed(e.target.checked);
                    if (e.target.checked) setTermsError(false);
                  }}
                />
                <label htmlFor="booking-terms">
                  I have read and agree to the{' '}
                  <a href="/terms" target="_blank" rel="noopener noreferrer">
                    Terms &amp; Conditions
                  </a>
                  .
                </label>
              </TermsRow>
              {termsError && (
                <TermsError>
                  Please read and accept the Terms &amp; Conditions before booking.
                </TermsError>
              )}

              <SubmitButton
                whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={sendEmail}
              >
                Send Booking Request
              </SubmitButton>
            </Modal>
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default BookingFormModal;