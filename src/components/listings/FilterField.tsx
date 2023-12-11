import { FloatingLabel, Form, FormControlProps } from "react-bootstrap";
import { ListingCardData } from "../../utils/Interfaces";

interface FilterFieldProps extends FormControlProps {
	labelText: string;
	type?: string;
}

function FilterSelect(props: FilterFieldProps) {
	return (
		<FloatingLabel label={props.labelText}>
			<Form.Control
				type={props.type}
				style={{ width: props.type === "date" ? 160 : 139 }}
				onChange={props.onChange}
			/>
		</FloatingLabel>
	);
}

export default FilterSelect;
