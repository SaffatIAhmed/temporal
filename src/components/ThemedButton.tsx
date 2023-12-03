import { ReactElement } from "react";
import Button from "react-bootstrap/Button";

interface ThemedButtonProps {
	content: string;
	icon?: ReactElement;
	minimal?: boolean;
	onClick: () => any;
}

function ThemedButtonProps(props: ThemedButtonProps) {
	return (
		<Button
			onClick={props.onClick}
			size="sm"
			style={{
				backgroundColor: props.minimal ? "white" : "#154734",
				borderColor: props.minimal ? "white" : "#154734",
				color: props.minimal ? "#154734" : "white",
			}}
		>
			<span
				style={{
					display: "flex",
					alignItems: "center",
					gap: 12,
				}}
			>
				<div>{props.icon}</div>
				<div style={{ fontSize: 16, fontWeight: 600 }}>
					{props.content}
				</div>
			</span>
		</Button>
	);
}

export default ThemedButtonProps;
