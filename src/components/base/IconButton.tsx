import { ReactElement } from "react";
import Button from "react-bootstrap/Button";

interface IconButtonProps {
	icon: ReactElement;
	onClick: () => {};
}

function IconButton(props: IconButtonProps) {
	return (
		<Button
			onClick={props.onClick}
			size="sm"
			variant="link"
			style={{
				width: 40,
				height: 40,
				color: "#212529",
			}}
		>
			{props.icon}
		</Button>
	);
}

export default IconButton;
