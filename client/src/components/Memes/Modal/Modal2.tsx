import { useState } from "react";
import { Media } from "./Media";
import {
	faFacebook,
	faReddit,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import {
	FacebookShareButton,
	RedditShareButton,
	TwitterShareButton,
} from "react-share";
import Modal from "../../../components/Modal/Modal";
import "./modal.css";
import { RootState } from "../../../store";
import axios from "axios";
import IotaButton from "../../IotaButton/IotaButton";

interface Props {
	meme: Record<string, any>;
	isActive: boolean;
	exitHandler: () => void;
}
export const MemeModal2 = ({ meme, isActive, exitHandler }: Props) => {
	const { imgURL, memeAuthor, memeTags, upvotes, id, user } = meme;
	const [visible, setVisible]: any = useState(false);
	const [message, setMessage]: any = useState("flagging meme...");

	const src = imgURL || "https://bulma.io/images/placeholders/1280x960.png";
	const classNames = isActive ? "is-active" : "";

	const userLogin = useSelector((state: RootState) => state.userLogin);
	const { userInfo }: any = userLogin ? userLogin : null;

	/* -------------------- flagging stuff -------------------- */

	const handleOnClickFlag = async () => {
		if (userInfo) {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo.token}`,
				},
			};
			try {
				const flag = await axios.post("/api/flags", { memeId: id }, config);
				setVisible(true);
				setMessage("Reported meme successfully :)");
			} catch (error) {
				setVisible(true);
				setMessage(
					"unable to create new report for this meme, this probably means that you have already reported this meme",
				);
			}
		} else {
			setVisible(true);
			setMessage("You need to log in to report a meme");
		}
	};

	return (
		<div className={"modal " + classNames}>
			<Modal visible={visible} setVisible={setVisible}>
				{message}
			</Modal>
			<div className="modal-background" onClick={exitHandler}></div>
			<div className="modal-content">
				<p className="image" style={{ background: "white" }}>
					<img src={src} alt="" />
				</p>
				<div className="modal-card-foot">
					<Media user={user} meme={meme} />
					<div className="iota-button-container">
						{user.wallet && (
							<IotaButton
								address={user.wallet}
								style={{ display: "block !important" }}
							/>
						)}
					</div>
					<nav
						className="level is-mobile"
						style={{
							position: "absolute",
							bottom: 0,
							right: 0,
							padding: "15px",
						}}
					>
						<div
							className="level-right"
							style={{ transform: "translateY(7px)" }}
						>
							<div className="level-item flag">
								<FontAwesomeIcon
									color="#cacaca"
									icon={faFlag}
									className="icon is-medium hover-grey"
									style={{
										marginBottom: "0.25rem",
										cursor: "pointer",
										transform: "translateY(-75px) translateX(130px)",
										height: "20px",
									}}
									onClick={handleOnClickFlag}
								/>
							</div>
							<a className="level-item">
								<span>
									<FacebookShareButton
										url={`${window.location.href}meme/${id}`}
									>
										<FontAwesomeIcon
											icon={faFacebook}
											className="icon is-medium"
											color="#cacaca"
										/>
									</FacebookShareButton>
								</span>
							</a>
							<a className="level-item">
								<span>
									<TwitterShareButton url={`${window.location.href}meme/${id}`}>
										<FontAwesomeIcon
											icon={faTwitter}
											className="icon is-medium"
											color="#cacaca"
										/>
									</TwitterShareButton>
								</span>
							</a>
							<a className="level-item">
								<span>
									<RedditShareButton url={`${window.location.href}meme/${id}`}>
										<FontAwesomeIcon
											icon={faReddit}
											className="icon is-medium"
											color="#cacaca"
										/>
									</RedditShareButton>
								</span>
							</a>
						</div>
					</nav>
				</div>
			</div>
			<button
				className="modal-close is-large"
				aria-label="close"
				onClick={exitHandler}
			></button>
		</div>
	);
};
