import React from "react";
import backgroundImage from "../assets/images/typewriter-801921_1280.jpg";
import featureImage from "../assets/images/pages_ebook_formatting.jpg";
import Editor from "./Editor";
export default function Home() {
    return (
        <>
            <section
                className="hero-home"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                }}
            >
                <h2>No-nonsense writing software</h2>
                <h3>
                    Cloud-based writing software focused on a smooth and simple
                    text editor, planner and organiser
                </h3>
                <p>
                    Writing a novel, non-fiction book, article or essay? If you
                    are looking for a simple, intuitive, minimal yet highly
                    functional writing tool? Dynowrite has your covered.
                </p>
            </section>
            <section className="features">
                {/* <img src={featureImage} alt="features-img" /> */}
                {/* <Editor /> */}
                {/* <div>
                    <h3>Features</h3>
                    <ul>
                        <li>Smooth, visual writer</li>
                        <li>Organise by theme, section, category</li>
                        <li>Sync with OneDrive and GoogleDrive</li>
                        <li>Offline mode</li>
                    </ul>
                </div> */}
            </section>
        </>
    );
}
