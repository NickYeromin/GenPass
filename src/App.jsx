import { use, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import logo from "./assets/logo.png";

function App() {
	const [isLength, setIsLenght] = useState(50);
	const [isUpperCase, setIsUpperCase] = useState(true);
	const [isLowerCase, setIsLowerCase] = useState(true);
	const [isNums, setIsNums] = useState(true);
	const [isSymbols, setIsSymbols] = useState(true);
	const [isPassword, setIsPassword] = useState("");
	const [isCopied, setIsCopied] = useState(false);
	const [isGenPassword, setIsGenPassword] = useState(false);
	const [isFontSize, setIsFontSize] = useState(24);

	const randomPassword = (length, upperCase, lowerCase, nums, symbols) => {
		const symLibliry = [
			"!",
			"@",
			"#",
			"$",
			"%",
			"^",
			"&",
			"*",
			"(",
			")",
			"-",
			"_",
			"=",
			"+",
			"[",
			"]",
			"{",
			"}",
			"|",
			";",
			":",
			"'",
			'"',
			",",
			".",
			"<",
			">",
			"/",
			"?",
			"~",
		];

		const result = [];
		const action = [];

		upperCase &&
			action.push(() =>
				String.fromCharCode(Math.floor(Math.random() * 26) + 65)
			);
		lowerCase &&
			action.push(() =>
				String.fromCharCode(Math.floor(Math.random() * 26) + 97)
			);
		nums && action.push(() => Math.floor(Math.random() * 10));
		symbols && action.push(() => symLibliry[Math.floor(Math.random() * 30)]);

		if (action.length === 0) return "Выбери из чего должен состоять пароль!";

		while (result.length < length) {
			result.push(action[Math.floor(Math.random() * action.length)]());
		}

		return result.join("");
	};

	const handleGeneration = () => {
		// setIsGenPassword(true);
		setIsPassword(
			randomPassword(isLength, isUpperCase, isLowerCase, isNums, isSymbols)
		);
		autoFontSize(isLength);
	};

	const copyToClipboard = async () => {
		await navigator.clipboard.writeText(isPassword);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 700);
	};

	const autoFontSize = (length) => {
		if (length < 29) setIsFontSize(24);
		if (length > 29 && length < 36) setIsFontSize(20);
		if (length > 36 && length < 38) setIsFontSize(18);
		if (length > 38 && length < 45) setIsFontSize(16);
		if (length > 45 && length < 52) setIsFontSize(14);
		if (length > 52 && length < 59) setIsFontSize(12);
		if (length > 59) setIsFontSize(11);
	};

	return (
		<>
			<img className="logo" src={logo} alt="GenPass" />
			<div className="conteiner password-box">
				<span style={{ fontSize: `${isFontSize}px` }} id="password">
					{isPassword}
				</span>
				<div className="conteiner">
					<button
						id="update"
						onClick={() => {
							setIsGenPassword(true);
							handleGeneration();
						}}
					>
						{console.log(isGenPassword)}
						<svg
							className={isGenPassword ? "rotate-animation" : ""}
							onAnimationEnd={() => setIsGenPassword(false)}
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							version="1.1"
						>
							<path
								d="M 8,1 A 7,7 0 0 0 1,8 L 2,8 A 6,6 0 0 1 8,2 6,6 0 0 1 12.916016,4.583984 L 11.5,6 15,6 15,2.5 13.634766,3.865234 A 7,7 0 0 0 8,1 Z m 6,7 A 6,6 0 0 1 8,14 6,6 0 0 1 3.0898438,11.410156 L 4.5,10 1,10 1,13.5 2.3671875,12.132812 A 7,7 0 0 0 8,15 7,7 0 0 0 15,8 l -1,0 z"
								fill="#bcbcbc"
							></path>
						</svg>
					</button>
					<button id="copy" onClick={copyToClipboard}>
						{isCopied ? "Скопировано!" : "Копировать"}
					</button>
				</div>
			</div>
			<div className="conteiner controlBox">
				<span>
					Длина пароля <span className="lengthPass">{isLength}</span>{" "}
					<input
						type="range"
						name=""
						id=""
						min="4"
						max="64"
						step="1"
						onChange={(e) => {
							setIsLenght(e.target.value);
							handleGeneration();
						}}
					/>
				</span>
				<span>
					<input
						type="checkbox"
						checked={isUpperCase}
						onChange={(e) => {
							setIsUpperCase(e.target.checked);
						}}
					/>
					Верхний регистр
				</span>
				<span>
					<input
						type="checkbox"
						checked={isLowerCase}
						onChange={(e) => {
							setIsLowerCase(e.target.checked);
						}}
					/>
					Нижний регистр
				</span>
				<span>
					<input
						type="checkbox"
						checked={isNums}
						onChange={(e) => {
							setIsNums(e.target.checked);
						}}
					/>
					Цифры
				</span>
				<span>
					<input
						type="checkbox"
						checked={isSymbols}
						onChange={(e) => {
							setIsSymbols(e.target.checked);
						}}
					/>
					Символы
				</span>
			</div>
		</>
	);
}

export default App;
