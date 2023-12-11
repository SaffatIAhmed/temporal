import { PropsWithChildren } from "react";
import Button, { ButtonProps } from "react-bootstrap/Button";

type IconButtonProps = ButtonProps & PropsWithChildren;

function IconButton(props: IconButtonProps) {
	return (
		<Button
			onClick={props.onClick}
			size="sm"
			variant="link"
			style={{
				width: 40,
				height: 40,
				color: "#154734",
			}}
		>
			{props.children}
		</Button>
	);
}

export default IconButton;
