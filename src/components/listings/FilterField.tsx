import { FloatingLabel, Form } from "react-bootstrap";

interface FilterFieldProps {
	label: string;
	type?: string;
}

function FilterSelect(props: FilterFieldProps) {
	return (
		<FloatingLabel label={props.label}>
			<Form.Control type={props.type} style={{ width: 100 }} />
		</FloatingLabel>
	);
}

export default FilterSelect;
