import { FloatingLabel, Form } from "react-bootstrap";

interface FilterSelectProps {
	label: string;
}

function FilterSelect(props: FilterSelectProps) {
	return (
		<FloatingLabel label={props.label}>
			<Form.Select style={{ minWidth: 150 }}>
				<option value={undefined}>Any</option>
				<option value={"true"}>Yes</option>
				<option value={"false"}>No</option>
			</Form.Select>
		</FloatingLabel>
	);
}

export default FilterSelect;
