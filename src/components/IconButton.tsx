import Button from "react-bootstrap/Button";

interface IconButtonProps {
	iconName: string;
	onClick: () => {};
}

function IconButton(props: IconButtonProps) {
	return (
		<div style={{ width: 40, height: 40 }}>
			<Button onClick={props.onClick} size="sm" variant="link">
				<img
					src={`src\\assets\\${props.iconName}.svg`}
					alt="Chat"
					width="24"
					height="24"
				/>
			</Button>
		</div>
	);
}

export default IconButton;
