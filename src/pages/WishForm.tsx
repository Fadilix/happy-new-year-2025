import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import "../scss/WishForm.scss";
import clipboardCopy from "clipboard-copy";

import toast from "react-hot-toast";
import GitHub from "../components/GitHub";
import useLanguage from "../hooks/UseLanguage";
const WishForm: React.FC = () => {
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    receiver: "",
    sender: "",
    language: language,
    customText: "",
  });

  const [showLink, setShowLink] = useState(false);

  // console.log(formData.customText);

  const [link, setLink] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const location = `https://happy-new-2025.vercel.app`;
  const newSender = formData.sender.trim().replace(/ /g, "_");
  const newReceiver = formData.receiver.trim().replace(/ /g, "_");
  const newCustomText = formData.customText.trim().replace(/ /g, "_");
  const lk = `${location}/wish/?sender=${newSender}&receiver=${newReceiver}&lang=${formData.language}${newCustomText && "&customText=" + newCustomText}`;

  // console.log(newReceiver, newSender);
  const handleGenerateLink = (link: string) => {
    setLink(link);

    if (!formData.sender && !formData.receiver) {
      language === "en"
        ? toast.error("Please fill all the fields !")
        : toast.error("Vous devez remplir tous les champs");
    } else {
      setShowLink(true);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCopyToClipBoard = (lk: any) => {
    clipboardCopy(lk)
      .then(() => {
        {
          language === "en"
            ? toast.success("Link copied sucessfully !")
            : toast.success("Lien copié avec succès");
        }
      })
      .catch(() => {
        {
          language === "en"
            ? toast.error("Failed to copy link, Please try again !")
            : toast.success("Echec lors de la copie, veuillez rééssaye");
        }
      });
  };
  return (
    <div className="wishform">
      <NavBar />
      <div className="form-container">
        <form onSubmit={handleFormSubmit}>
          <div className="input-container">
            <label htmlFor="receiver">
              {" "}
              {language === "en"
                ? "Name of the receiver"
                : "Nom du destinataire"}
            </label>
            <input
              type="text"
              name="receiver"
              value={formData.receiver}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="sender">
              {" "}
              {language === "en" ? "Name of the sender" : "Nom de l'expéditeur"}
            </label>
            <input
              type="text"
              name="sender"
              value={formData.sender}
              onChange={handleInputChange}
              required
            />
          </div>

          <div
            className="input-container"
            style={{ position: "relative", marginBottom: "10px" }}
          >
            <label
              htmlFor="sender"
              style={{ color: "#555", textShadow: "0 0 1px white" }}
            >
              {" "}
              {language === "en"
                ? "Custom text (optional)"
                : "Message personnalisé"}
            </label>
            <textarea
              className="customText"
              style={{ border: "1px solid #555", textShadow: "0 0 1px white" }}
              name="customText"
              value={formData.customText}
              onChange={handleInputChange}
            />
            <p
              style={{
                position: "absolute",
                fontSize: "9px",
                bottom: "5px",
                color: "#ccc",
              }}
            >
              {language === "en"
                ? "PS: if not filled, uses default template"
                : "Si non renseigné, utilise le modèle par défaut."}
            </p>
          </div>

          <div className="input-container">
            <label htmlFor="language">
              {" "}
              {language === "en" ? "Language" : "Langue"}
            </label>
            <select
              disabled={formData.customText.length > 0}
              name="language"
              // value={formData.language}
              onChange={handleInputChange}
              required
              defaultValue={language}
            >
              <option value="en">English</option>
              <option value="fr">French</option>
            </select>
          </div>

          <button
            onClick={() => {
              handleGenerateLink(lk);
            }}
            className="generate-link"
          >
            {language === "en" ? "Generate link" : "Générer le lien"}
          </button>
        </form>

        {showLink && (
          <div className="results">
            <Link
              style={{ display: "none" }}
              to={`/wish/?sender=${newSender}&receiver=${newReceiver}&lang=${formData.language}${newCustomText && "&customText=" + newCustomText}`}
            >
              {link}
            </Link>
            <button
              onClick={() => {
                handleCopyToClipBoard(lk);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <GitHub />
    </div>
  );
};

export default WishForm;
