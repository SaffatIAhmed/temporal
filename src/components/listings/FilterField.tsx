import { FloatingLabel, Form } from "react-bootstrap";
import { ListingCardData } from "../../utils/Interfaces";

interface FilterFieldProps {
	label: string;
	type?: string;
}

function FilterSelect(props: FilterFieldProps) {
	return (
		<FloatingLabel label={props.label}>
			<Form.Control
				type={props.type}
				style={{ width: props.type === "date" ? 160 : 139 }}
			/>
		</FloatingLabel>
	);
}

export default FilterSelect;
