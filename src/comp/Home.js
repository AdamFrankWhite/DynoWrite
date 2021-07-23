import React from "react";
import backgroundImage from "../assets/images/typewriter-801921_1280.jpg";
export default function Home() {
    return (
        <section>
            <div
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
            </div>
        </section>
    );
}
