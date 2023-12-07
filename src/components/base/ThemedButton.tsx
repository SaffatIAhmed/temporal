import { ReactElement } from "react";
import Button, { ButtonProps } from "react-bootstrap/Button";

interface ThemedButtonProps extends ButtonProps {
	icon?: ReactElement;
	minimal?: boolean;
}

function ThemedButton({ children, icon, minimal, onClick, type }: ThemedButtonProps) {
	return (
		<Button
			type={type}
			onClick={onClick}
			size="sm"
			style={{
				backgroundColor: minimal ? "white" : "#154734",
				borderColor: minimal ? "white" : "#154734",
				color: minimal ? "#154734" : "white",
			}}
		>
			<span
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					gap: 12,
				}}
			>
				<div>{icon}</div>
				<div style={{ fontSize: 16, fontWeight: 600 }}>
					{children}
				</div>
			</span>
		</Button>
	);
}

export default ThemedButton;
