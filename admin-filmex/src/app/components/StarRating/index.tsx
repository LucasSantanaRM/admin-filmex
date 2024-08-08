import { MdOutlineStarPurple500 } from "react-icons/md";
import { MdOutlineStarBorder } from "react-icons/md";
import './index.scss'
export interface Props {
    rating: number;
}

export default function StarRating(props: Props) {
    const numStars = Math.round(props.rating / 2);
    const fullstars = [];
    const emptyStars = [];

    for (let i = 0; i < 5; i++) {
        if (i < numStars) {
            fullstars.push(i);
        } else {
            emptyStars.push(i);
        }
    }

    return (
        <div className="movie-rate">
            {fullstars.map((_, index) => (
                <MdOutlineStarPurple500 key={`full-${index}`} />
            ))}
            {emptyStars.map((_, index) => (
                <MdOutlineStarBorder key={`empty-${index}`} />
            ))}
        </div>
    );
}
