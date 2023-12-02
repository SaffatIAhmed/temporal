import { ReactElement } from "react";
import Button from "react-bootstrap/Button";

interface IconButtonProps {
	icon: ReactElement;
	onClick: () => {};
}

function IconButton(props: IconButtonProps) {
	return (
		<div style={{ width: 40, height: 40 }}>
			<Button
				onClick={props.onClick}
				size="sm"
				variant="link"
				style={{
					color: "#212529",
				}}
			>
				{props.icon}
			</Button>
		</div>
	);
}

export default IconButton;
